#!/bin/bash

# Download the notebook and dataset from S3
# aws s3 cp $NOTEBOOK_URL /app/execNotebook.ipynb
# aws s3 cp $DATASET_URL /app/data.csv

# # Run the Jupyter notebook
# jupyter nbconvert --to notebook --execute /app/execNotebook.ipynb --output /app/output.ipynb