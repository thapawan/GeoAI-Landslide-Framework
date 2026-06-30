
# GeoAI Framework for Community-Based Landslide Early Warning in Nepal

[![Python 3.9+](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://www.python.org/)
[![Google Earth Engine](https://img.shields.io/badge/Google_Earth_Engine-API-green.svg)](https://developers.google.com/earth-engine)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.XXXXXXX.svg)](https://doi.org/10.5281/zenodo.XXXXXXX)

## 📋 Overview

This repository contains the complete code, data, and documentation for the research paper:

**"A GeoAI Framework for Community-Based Landslide Early Warning Using Remote Sensing, Machine Learning, and Explainable AI"**  
*Submitted to Frontiers in Earth Science - Special Issue on GeoAI*

The framework integrates:
- 🌍 **Google Earth Engine (GEE)** for cloud-based geospatial data processing
- 🤖 **Machine Learning** (Random Forest & XGBoost) for susceptibility modeling
- 📊 **Explainable AI** (SHAP) for model interpretability
- 🗺️ **Spatial Analysis** for landslide susceptibility mapping at national scale

### Key Results
- **XGBoost Model**: Accuracy = 88.3%, ROC-AUC = 0.952
- **Random Forest**: Accuracy = 87.9%, ROC-AUC = 0.945
- **Top Predictors**: Slope, Rainfall, Elevation, NDVI
- **High-Risk Districts**: Sindhupalchok, Dolakha, Dhading, Rasuwa, Gorkha, Nuwakot

---

## 📂 Repository Structure

```
GeoAI-Landslide-EarlyWarning-Nepal/
│
├── data/
│   ├── raw/
│   │   ├── landslide_inventory/          # 4,743 landslide polygons
│   │   ├── non_landslide_samples/        # 4,736 non-landslide locations
│   │   └── predictor_variables/          # Original geospatial layers
│   │
│   ├── processed/
│   │   ├── training_data.csv             # Final dataset (9,479 samples)
│   │   ├── predictor_stack.tif           # Multi-band raster (30m resolution)
│   │   └── nepal_boundary.shp            # Study area boundary
│   │
│   └── outputs/
│       ├── models/                       # Trained models (.pkl files)
│       ├── susceptibility_maps/          # GeoTIFF outputs
│       ├── figures/                      # Publication-ready figures
│       └── metrics/                      # Performance metrics CSV
│
├── notebooks/
│   ├── 01_data_extraction_gee.ipynb      # GEE data extraction pipeline
│   ├── 02_data_preprocessing.ipynb       # Feature engineering & cleaning
│   ├── 03_exploratory_analysis.ipynb     # EDA and visualization
│   ├── 04_model_training.ipynb           # RF & XGBoost training
│   ├── 05_model_evaluation.ipynb         # Performance validation
│   ├── 06_shap_analysis.ipynb            # Explainable AI interpretation
│   └── 07_susceptibility_mapping.ipynb   # Map generation
│
├── src/
│   ├── gee_utils.py                      # GEE helper functions
│   ├── ml_utils.py                       # ML pipeline utilities
│   ├── shap_utils.py                     # SHAP analysis functions
│   ├── mapping_utils.py                  # Spatial visualization tools
│   └── config.py                         # Configuration parameters
│
├── results/
│   ├── figures/
│   │   ├── figure_1_study_area.png
│   │   ├── figure_2_predictors.png
│   │   ├── figure_3_performance.png
│   │   └── figure_4_susceptibility_map.png
│   ├── tables/
│   │   ├── model_performance.csv
│   │   ├── feature_importance.csv
│   │   └── shap_summary.csv
│   └── maps/
│       ├── susceptibility_map_high_res.tif
│       └── susceptibility_map_classified.tif
│
├── docs/
│   ├── methodology.pdf                    # Extended methodology
│   ├── data_dictionary.md                 # Variable descriptions
│   └── user_guide.md                      # Step-by-step usage guide
│
├── tests/
│   ├── test_data_quality.py               # Data validation tests
│   └── test_model_pipeline.py             # Unit tests for ML pipeline
│
├── requirements.txt                       # Python dependencies
├── environment.yml                        # Conda environment
├── setup.py                              # Package installation
├── LICENSE                               # MIT License
├── .gitignore                            # Git ignore file
├── CITATION.cff                          # Citation metadata
└── README.md                             # This file
```

---

## 🚀 Getting Started

### Prerequisites

1. **Google Earth Engine Account**: [Sign up here](https://signup.earthengine.google.com/)
2. **Python 3.9+** installed
3. **Google Colab** or **Jupyter Notebook** environment

### Installation

#### Option 1: Using Conda (Recommended)

```bash
# Clone the repository
git clone https://github.com/thapawan/GeoAI-Landslide-EarlyWarning-Nepal.git
cd GeoAI-Landslide-EarlyWarning-Nepal

# Create conda environment
conda env create -f environment.yml
conda activate landslide-geoai

# Install package in development mode
pip install -e .
```

#### Option 2: Using pip

```bash
# Clone repository
git clone https://github.com/thapawan/GeoAI-Landslide-EarlyWarning-Nepal.git
cd GeoAI-Landslide-EarlyWarning-Nepal

# Install dependencies
pip install -r requirements.txt
```

### Google Earth Engine Setup

```python
# Authenticate GEE
import ee
ee.Authenticate()
ee.Initialize(project='your-project-id')
```

---

## 📊 Data Sources

| Variable | Source | Resolution | Years |
|----------|--------|------------|-------|
| **Landslide Inventory** | Compiled from multiple sources | Polygon centroids | 2000-2023 |
| **Elevation** | SRTM DEM | 30m | 2000 |
| **Slope** | Derived from SRTM | 30m | Derived |
| **Aspect** | Derived from SRTM | 30m | Derived |
| **NDVI** | Sentinel-2 | 10m | 2015-2024 |
| **Rainfall** | CHIRPS | ~5.6km | 2015-2024 |
| **Population** | WorldPop | 1km | 2020 |
| **Land Cover** | ESA WorldCover | 10m | 2021 |

---

## 🧪 Workflow

### 1. Data Extraction (Google Earth Engine)

```python
# Run the GEE extraction notebook
jupyter notebook notebooks/01_data_extraction_gee.ipynb
```

**What it does:**
- Loads study area boundary
- Extracts all predictor variables
- Samples at landslide and non-landslide locations
- Exports CSV dataset

### 2. Data Preprocessing

```python
# Run preprocessing notebook
jupyter notebook notebooks/02_data_preprocessing.ipynb
```

**What it does:**
- Handles missing values
- Transforms aspect to sine/cosine components
- One-hot encodes land cover categories
- Creates train-test split (70:30)

### 3. Model Training

```python
# Run model training
jupyter notebook notebooks/04_model_training.ipynb
```

**Configuration:**
```python
# XGBoost Parameters
params = {
    'n_estimators': 500,
    'learning_rate': 0.05,
    'max_depth': 6,
    'subsample': 0.8,
    'colsample_bytree': 0.8,
    'random_state': 42
}

# Random Forest Parameters
rf_params = {
    'n_estimators': 500,
    'max_depth': 15,
    'random_state': 42
}
```

### 4. Model Evaluation

```python
# Evaluate models
from sklearn.metrics import accuracy_score, roc_auc_score, f1_score

# Metrics calculated:
# - Accuracy
# - Precision & Recall
# - F1-Score
# - ROC-AUC
# - Confusion Matrix
# - 10-fold Cross-Validation
```

### 5. SHAP Analysis

```python
# Run SHAP interpretation
jupyter notebook notebooks/06_shap_analysis.ipynb
```

**Outputs:**
- Global feature importance
- SHAP summary plots
- Dependence plots for top features
- Force plots for individual predictions

### 6. Susceptibility Mapping

```python
# Generate susceptibility maps
jupyter notebook notebooks/07_susceptibility_mapping.ipynb
```

**Classification:**
- **Low**: 0.0 - 0.33
- **Moderate**: 0.33 - 0.66
- **High**: 0.66 - 1.0

---

## 📈 Results

### Model Performance Comparison

| Model | Accuracy | Precision | Recall | F1-Score | ROC-AUC |
|-------|----------|-----------|--------|----------|---------|
| Random Forest | 87.9% | 0.88 | 0.88 | 0.88 | 0.945 |
| XGBoost | 88.3% | 0.88 | 0.88 | 0.89 | 0.952 |

### Feature Importance (SHAP)

| Feature | Importance | Direction |
|---------|------------|-----------|
| Slope | 0.269 | Positive |
| Rainfall | 0.161 | Positive |
| Elevation | 0.147 | Positive |
| NDVI | 0.130 | Negative |
| Aspect | 0.105 | Mixed |
| Population | 0.098 | Mixed |
| Land Cover | 0.090 | Mixed |

### High-Risk Districts Identified

1. **Sindhupalchok**
2. **Dolakha**
3. **Dhading**
4. **Rasuwa**
5. **Gorkha**
6. **Nuwakot**
7. **Ramechhap**

---

## 🛠️ Reproducing the Analysis

### Quick Start with Google Colab

Click the badge below to open the complete workflow in Google Colab:

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/thapawan/GeoAI-Landslide-EarlyWarning-Nepal/blob/main/notebooks/00_full_pipeline.ipynb)

### Local Execution

```bash
# Run full pipeline
python src/pipeline.py --config config/default.yaml

# Train specific model
python src/train.py --model xgboost --data data/processed/training_data.csv

# Generate SHAP analysis
python src/shap_analysis.py --model outputs/models/xgboost_model.pkl --data data/processed/training_data.csv

# Create susceptibility map
python src/mapping.py --model outputs/models/xgboost_model.pkl --raster data/processed/predictor_stack.tif
```

---

## 📝 Dependencies

### Core Requirements

```txt
# Geospatial
earthengine-api==0.1.389
geemap==0.30.0
geopandas==0.14.2
rasterio==1.3.10
shapely==2.0.3
pyproj==3.6.1

# Machine Learning
scikit-learn==1.3.2
xgboost==2.0.3
numpy==1.24.3
pandas==2.1.4

# Visualization
matplotlib==3.8.2
seaborn==0.13.1
plotly==5.18.0

# Explainable AI
shap==0.44.0

# Utilities
joblib==1.3.2
tqdm==4.66.1
pyyaml==6.0.1
```

---

## 🎯 Key Findings

1. **Model Performance**: XGBoost (AUC=0.952) slightly outperforms Random Forest (AUC=0.945)
2. **Critical Factors**: Slope dominates (27% importance), followed by rainfall (16%) and elevation (15%)
3. **Vegetation Effect**: Lower NDVI (degraded areas) strongly correlates with higher susceptibility
4. **Spatial Pattern**: High susceptibility concentrated in central Himalayan districts
5. **SHAP Insights**: Revealed positive relationship between slope, rainfall, and landslide probability

---

## 🔬 Citation

If you use this code or data in your research, please cite:

```bibtex
@article{thapa2026geoai,
  title={A GeoAI Framework for Community-Based Landslide Early Warning Using Remote Sensing, Machine Learning, and Explainable AI},
  author={Thapa, Pawan},
  journal={Frontiers in Earth Science},
  volume={XX},
  pages={XXX},
  year={2026},
  doi={10.XXXX/feart.2026.XXXXXX}
}
```

### Software Citation

```bibtex
@software{thapa2026geoaiframework,
  author = {Thapa, Pawan},
  title = {GeoAI Framework for Community-Based Landslide Early Warning in Nepal},
  year = {2026},
  publisher = {GitHub},
  url = {https://github.com/thapawan/GeoAI-Landslide-EarlyWarning-Nepal},
  doi = {10.5281/zenodo.XXXXXXX}
}
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Earth Engine** for cloud-based geospatial processing
- **NASA SRTM** for elevation data
- **ESA WorldCover** for land cover classification
- **CHIRPS** for rainfall data
- **WorldPop** for population density data
- **Sentinel-2** for vegetation monitoring

---

## 📧 Contact

**Pawan Thapa**  
Department of Geography and the Environment  
The University of Alabama, Tuscaloosa, USA  
📧 pthapa@crimson.ua.edu  
🔗 [Personal Website](https://pawanthapa.com)

---

## 📚 Additional Resources

- [Google Earth Engine Documentation](https://developers.google.com/earth-engine)
- [XGBoost Documentation](https://xgboost.readthedocs.io)
- [SHAP Documentation](https://shap.readthedocs.io)
- [Frontiers in Earth Science Guidelines](https://www.frontiersin.org/journals/earth-science)
- [Nepal Disaster Risk Reduction Portal](https://drrportal.gov.np)

---

## ⚠️ Disclaimer

This framework is provided for research and educational purposes. While the models demonstrate strong predictive performance in the study area, operational early warning systems require additional components including:
- Real-time rainfall monitoring
- Threshold-based alerts
- Communication infrastructure
- Community engagement protocols

The susceptibility maps should be used as planning tools in conjunction with local expertise and ground-truth verification.

---

## 🔄 Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0.0 | 2026-06-29 | Initial release |
| v1.1.0 | TBD | Add real-time monitoring module |
| v2.0.0 | TBD | Deep learning integration |

---

## 🧪 Testing

```bash
# Run all tests
pytest tests/

# Run specific test
pytest tests/test_model_pipeline.py -v
```

---

## 📊 Data Access and Request

The training dataset and processed predictor stack are available upon reasonable request. Due to licensing restrictions, some raw datasets may require individual access through their respective providers.

**Data Request Form**: [Google Form Link]

---

## 🎓 Educational Use

This repository is designed to be educational. For teaching purposes:

1. **Introductory**: Use `notebooks/01_data_extraction_gee.ipynb` for GIS/remote sensing students
2. **Intermediate**: Use `notebooks/04_model_training.ipynb` for ML applications in earth science
3. **Advanced**: Use the complete pipeline for research methods courses

---

## 🐛 Known Issues

- SHAP computation on full dataset requires significant memory (~16GB RAM recommended)
- GEE export may timeout for very large extents; use regional tiling
- Aspect sine/cosine transformation requires verification with circular statistics

---

## 🔒 Security

For security concerns, please email the maintainer directly rather than opening a public issue.

---

## 📈 Roadmap

- [ ] Add deep learning models (CNN, LSTM)
- [x] Implement SHAP for interpretability
- [ ] Develop real-time monitoring dashboard
- [ ] Integrate rainfall threshold modeling
- [ ] Create mobile app for community reporting
- [ ] Expand to entire Himalayan region
- [ ] Add climate change scenario projections

---

**⭐ Star this repository if you find it useful!**

Made with ❤️ for disaster risk reduction in Nepal
```

---

## Supporting Files

### 1. .gitignore

```gitignore
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
env.bak/
venv.bak/

# Jupyter Notebooks
.ipynb_checkpoints/
*.ipynb_checkpoints/
*.pynb

# Data
data/raw/*
data/processed/*
!data/processed/.gitkeep
!data/raw/.gitkeep

# Models
*.pkl
*.joblib
*.h5
*.pt

# Outputs
results/
outputs/
*.tif
*.gpkg
*.geojson

# GEE
*.gee

# Environment
.env
.venv

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
```

### 2. environment.yml

```yaml
name: landslide-geoai
channels:
  - conda-forge
  - defaults
dependencies:
  - python=3.9
  - numpy=1.24.3
  - pandas=2.1.4
  - geopandas=0.14.2
  - rasterio=1.3.10
  - matplotlib=3.8.2
  - seaborn=0.13.1
  - scikit-learn=1.3.2
  - xgboost=2.0.3
  - shap=0.44.0
  - joblib=1.3.2
  - tqdm=4.66.1
  - pyyaml=6.0.1
  - pyproj=3.6.1
  - pip
  - pip:
    - earthengine-api==0.1.389
    - geemap==0.30.0
    - plotly==5.18.0
    - black==24.3.0
    - pylint==3.1.0
    - pytest==8.2.0
    - pytest-cov==5.0.0
```

### 3. requirements.txt

```txt
# Core geospatial
earthengine-api==0.1.389
geemap==0.30.0
geopandas==0.14.2
rasterio==1.3.10
shapely==2.0.3
pyproj==3.6.1
folium==0.16.0

# Data manipulation
numpy==1.24.3
pandas==2.1.4
scipy==1.11.4

# Machine Learning
scikit-learn==1.3.2
xgboost==2.0.3

# Visualization
matplotlib==3.8.2
seaborn==0.13.1
plotly==5.18.0
wordcloud==1.9.3

# Explainable AI
shap==0.44.0

# Utilities
joblib==1.3.2
tqdm==4.66.1
pyyaml==6.0.1
click==8.1.7

# Development
black==24.3.0
pylint==3.1.0
pytest==8.2.0
pytest-cov==5.0.0
pre-commit==3.7.0

# Optional
geemap==0.30.0  # For GEE interactive maps
ipykernel==6.29.0  # For Jupyter support
ipywidgets==8.1.2  # For interactive visualizations
```

### 4. CITATION.cff

```yaml
cff-version: 1.2.0
message: "If you use this software, please cite it as below."
authors:
  - family-names: "Thapa"
    given-names: "Pawan"
    affiliation: "Department of Geography and the Environment, The University of Alabama"
    email: "pthapa@crimson.ua.edu"
    orcid: "https://orcid.org/XXXX-XXXX-XXXX-XXXX"
title: "GeoAI Framework for Community-Based Landslide Early Warning in Nepal"
version: 1.0.0
date-released: 2026-06-29
url: "https://github.com/thapawan/GeoAI-Landslide-EarlyWarning-Nepal"
repository-code: "https://github.com/thapawan/GeoAI-Landslide-EarlyWarning-Nepal"
doi: "10.5281/zenodo.XXXXXXX"
keywords:
  - "Landslide Susceptibility"
  - "GeoAI"
  - "Machine Learning"
  - "Google Earth Engine"
  - "SHAP"
  - "Nepal"
  - "Disaster Risk Reduction"
license: MIT
```

---

## Repository Initialization Script

To set up the repository structure:

```bash
#!/bin/bash
# setup_repo.sh

# Create directory structure
mkdir -p data/{raw,processed,outputs}
mkdir -p notebooks
mkdir -p src
mkdir -p results/{figures,tables,maps}
mkdir -p docs
mkdir -p tests

# Create README
touch README.md

# Create license
cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2026 Pawan Thapa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF

# Create initial Python files
touch src/__init__.py
touch src/gee_utils.py
touch src/ml_utils.py
touch src/shap_utils.py
touch src/mapping_utils.py
touch src/config.py

# Create notebook placeholder
echo "{\"cells\":[],\"metadata\":{},\"nbformat\":4,\"nbformat_minor\":4}" > notebooks/00_template.ipynb

echo "Repository structure created successfully!"
```

---

