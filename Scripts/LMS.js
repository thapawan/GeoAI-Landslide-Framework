// =====================================================
// Landslide Inventory
// =====================================================

var landslides = ee.FeatureCollection(
'projects/skilful-boulder-440618-e7/assets/data'
);

print('Number of polygons', landslides.size());

// =====================================================
// Convert Polygon -> Centroid
// =====================================================

var landslidePts = landslides.map(function(f) {
  return ee.Feature(
    f.geometry().centroid(1)
  ).set('Class', 1);
});

print('Landslide Points', landslidePts.size());

Map.addLayer(
  landslidePts,
  {color:'red'},
  'Landslide Points'
);

// =====================================================
// Create 500 m Exclusion Buffer
// =====================================================

var landslideBuffer = landslides.map(function(f){
  return f.buffer(500);
});

Map.addLayer(
  landslideBuffer,
  {color:'yellow'},
  '500m Buffer'
);

// =====================================================
// Generate Candidate Non-Landslide Points
// =====================================================

// Generate many extra points initially
var candidatePoints = ee.FeatureCollection.randomPoints({
  region: nepal.geometry(),
  points: 15000,
  seed: 42
});

// =====================================================
// Remove Points Inside Buffer
// =====================================================

var nonslideFiltered = candidatePoints.filter(
  ee.Filter.not(
    ee.Filter.bounds(
      ee.FeatureCollection(landslideBuffer).geometry()
    )
  )
);

// Keep same number as landslides
var nonslide = nonslideFiltered
  .limit(4747)
  .map(function(f){
    return f.set('Class', 0);
  });

print('Non-Landslide Points', nonslide.size());

Map.addLayer(
  nonslide,
  {color:'blue'},
  'Non-Landslide Points'
);

// =====================================================
// Merge Samples
// =====================================================

var samples = landslidePts.merge(nonslide);

print('Total Samples', samples.size());

// =====================================================
// Extract Predictor Values
// =====================================================

var training = predictors.sampleRegions({
  collection: samples,
  properties:['Class'],
  scale:30,
  geometries:false,
  tileScale:16
});

print('Training Size', training.size());
print('First Record', training.first());

// =====================================================
// Export CSV
// =====================================================

Export.table.toDrive({
  collection: training,
  description:'Nepal_Landslide_Training_Buffer500m',
  fileFormat:'CSV'
});
