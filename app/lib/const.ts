const diseases = [
  {
    id: 9999999,
    name: "All",
    description: "It aims to address all diseases",
    category: "n/a",
    categoryId: 0,
  },
  {
    id: 0,
    name: "Other",
    description: "Not in the list",
    category: "n/a",
    categoryId: 0,
  },
  {
    id: 1,
    name: "Alzheimer's Disease",
    description:
      "Alzheimer's Disease is a progressive neurological disorder that affects memory and cognitive function.",
    category: "Neurological Disorders",
    categoryId: 1,
  },
  {
    id: 2,
    name: "Parkinson's Disease",
    description:
      "Parkinson's Disease is a neurodegenerative disorder that primarily affects movement, causing tremors and stiffness.",
    category: "Neurological Disorders",
    categoryId: 1,
  },
  {
    id: 3,
    name: "Multiple Sclerosis",
    description:
      "Multiple Sclerosis is a chronic illness affecting the central nervous system, leading to fatigue, mobility issues, and cognitive changes.",
    category: "Neurological Disorders",
    categoryId: 1,
  },
  {
    id: 4,
    name: "Rheumatoid Arthritis",
    description:
      "Rheumatoid Arthritis is an autoimmune disorder where the immune system attacks the joints, causing inflammation and pain.",
    category: "Autoimmune Diseases",
    categoryId: 2,
  },
  {
    id: 5,
    name: "Lupus",
    description:
      "Lupus is a chronic autoimmune disease that can cause inflammation and pain in any part of the body, including skin, joints, and organs.",
    category: "Autoimmune Diseases",
    categoryId: 2,
  },
  {
    id: 6,
    name: "Type 1 Diabetes",
    description:
      "Type 1 Diabetes is an autoimmune condition where the pancreas produces little or no insulin, leading to high blood sugar levels.",
    category: "Autoimmune Diseases",
    categoryId: 2,
  },
  {
    id: 7,
    name: "Influenza",
    description:
      "Influenza, commonly known as the flu, is a viral infection that affects the respiratory system and causes fever, cough, and muscle aches.",
    category: "Infectious Diseases",
    categoryId: 3,
  },
  {
    id: 8,
    name: "HIV/AIDS",
    description:
      "HIV is a virus that attacks the immune system, and AIDS is the final stage of HIV infection when the body can no longer fight infections.",
    category: "Infectious Diseases",
    categoryId: 3,
  },
  {
    id: 9,
    name: "Tuberculosis",
    description:
      "Tuberculosis is a bacterial infection that primarily affects the lungs and can cause coughing, weight loss, and night sweats.",
    category: "Infectious Diseases",
    categoryId: 3,
  },
  {
    id: 10,
    name: "Cystic Fibrosis",
    description:
      "Cystic Fibrosis is a genetic disorder that affects the lungs and digestive system, leading to persistent respiratory infections and difficulty breathing.",
    category: "Genetic Disorders",
    categoryId: 4,
  },
  {
    id: 11,
    name: "Sickle Cell Anemia",
    description:
      "Sickle Cell Anemia is a hereditary blood disorder that causes red blood cells to become misshapen, leading to pain and anemia.",
    category: "Genetic Disorders",
    categoryId: 4,
  },
  {
    id: 12,
    name: "Down Syndrome",
    description:
      "Down Syndrome is a genetic condition caused by an extra copy of chromosome 21, leading to developmental delays and physical characteristics.",
    category: "Genetic Disorders",
    categoryId: 4,
  },
  {
    id: 13,
    name: "Obesity",
    description:
      "Obesity is a condition characterized by excessive body fat that increases the risk of health problems such as heart disease and diabetes.",
    category: "Lifestyle-Related Diseases",
    categoryId: 5,
  },
  {
    id: 14,
    name: "Type 2 Diabetes",
    description:
      "Type 2 Diabetes is a chronic condition that affects the way the body processes blood sugar, often linked to obesity and inactivity.",
    category: "Lifestyle-Related Diseases",
    categoryId: 5,
  },
  {
    id: 15,
    name: "Coronary Artery Disease",
    description:
      "Coronary Artery Disease occurs when the arteries that supply blood to the heart become narrowed or blocked, leading to chest pain or heart attacks.",
    category: "Cardiovascular Diseases",
    categoryId: 6,
  },
  {
    id: 16,
    name: "Hypertension",
    description:
      "Hypertension, or high blood pressure, is a chronic condition that increases the risk of heart disease, stroke, and kidney problems.",
    category: "Cardiovascular Diseases",
    categoryId: 6,
  },
  {
    id: 17,
    name: "Leukemia",
    description:
      "Leukemia is a type of cancer that affects the blood and bone marrow, leading to the production of abnormal white blood cells.",
    category: "Cancers",
    categoryId: 7,
  },
  {
    id: 18,
    name: "Lung Cancer",
    description:
      "Lung Cancer is a type of cancer that begins in the lungs and is often linked to smoking, causing coughing, chest pain, and breathing difficulty.",
    category: "Cancers",
    categoryId: 7,
  },
  {
    id: 19,
    name: "Breast Cancer",
    description:
      "Breast Cancer is a type of cancer that develops in breast tissue, commonly affecting women and sometimes men.",
    category: "Cancers",
    categoryId: 7,
  },
  {
    id: 20,
    name: "Prostate Cancer",
    description:
      "Prostate Cancer is a type of cancer that develops in the prostate gland, which is part of the male reproductive system.",
    category: "Cancers",
    categoryId: 7,
  },
  {
    id: 21,
    name: "Crohn's Disease",
    description:
      "Crohn's Disease is a chronic inflammatory bowel disease that affects the lining of the digestive tract.",
    category: "Digestive Disorders",
    categoryId: 8,
  },
  {
    id: 22,
    name: "Ulcerative Colitis",
    description:
      "Ulcerative Colitis is a chronic inflammatory condition that causes inflammation and ulcers in the colon and rectum.",
    category: "Digestive Disorders",
    categoryId: 8,
  },
  {
    id: 23,
    name: "Irritable Bowel Syndrome (IBS)",
    description:
      "IBS is a gastrointestinal disorder that causes abdominal pain, bloating, and altered bowel habits.",
    category: "Digestive Disorders",
    categoryId: 8,
  },
  {
    id: 24,
    name: "Asthma",
    description:
      "Asthma is a chronic lung disease that causes inflammation and narrowing of the airways, leading to wheezing and shortness of breath.",
    category: "Respiratory Diseases",
    categoryId: 9,
  },
  {
    id: 25,
    name: "Chronic Bronchitis",
    description:
      "Chronic Bronchitis is a long-term inflammation of the bronchi in the lungs, often caused by smoking.",
    category: "Respiratory Diseases",
    categoryId: 9,
  },
  {
    id: 26,
    name: "Emphysema",
    description:
      "Emphysema is a chronic lung condition where the air sacs are damaged, leading to breathing difficulties.",
    category: "Respiratory Diseases",
    categoryId: 9,
  },
  {
    id: 27,
    name: "Pneumonia",
    description:
      "Pneumonia is an infection that inflames the air sacs in one or both lungs, which may fill with fluid or pus.",
    category: "Infectious Diseases",
    categoryId: 3,
  },
  {
    id: 29,
    name: "Measles",
    description:
      "Measles is a highly contagious viral infection that causes a total-body skin rash and flu-like symptoms.",
    category: "Infectious Diseases",
    categoryId: 3,
  },
  {
    id: 30,
    name: "Malaria",
    description:
      "Malaria is a life-threatening disease caused by parasites transmitted to humans through the bites of infected mosquitoes.",
    category: "Infectious Diseases",
    categoryId: 3,
  },
  {
    id: 31,
    name: "Dengue Fever",
    description:
      "Dengue Fever is a mosquito-borne viral disease that causes high fever, severe headaches, and joint pain.",
    category: "Infectious Diseases",
    categoryId: 3,
  },
  {
    id: 32,
    name: "Zika Virus",
    description:
      "Zika Virus is a mosquito-borne illness that can cause fever, rash, and joint pain, and is linked to birth defects in pregnant women.",
    category: "Infectious Diseases",
    categoryId: 3,
  },
  {
    id: 33,
    name: "Ebola Virus",
    description:
      "Ebola Virus is a severe, often fatal illness in humans caused by infection with a strain of the Ebola virus.",
    category: "Infectious Diseases",
    categoryId: 3,
  },
  {
    id: 34,
    name: "West Nile Virus",
    description:
      "West Nile Virus is a virus transmitted to humans by mosquitoes, causing flu-like symptoms and in rare cases, severe neurological illness.",
    category: "Infectious Diseases",
    categoryId: 3,
  },
  {
    id: 35,
    name: "Candidiasis",
    description:
      "Candidiasis is a fungal infection caused by yeasts from the genus Candida, affecting various parts of the body, particularly the mouth and genitals.",
    category: "Infectious Diseases",
    categoryId: 3,
  },
  {
    id: 36,
    name: "Leprosy",
    description:
      "Leprosy is a chronic infectious disease caused by Mycobacterium leprae, affecting the skin, nerves, and mucous membranes.",
    category: "Infectious Diseases",
    categoryId: 3,
  },
  {
    id: 37,
    name: "Anthrax",
    description:
      "Anthrax is a serious infectious disease caused by Bacillus anthracis, typically affecting livestock but can also infect humans.",
    category: "Infectious Diseases",
    categoryId: 3,
  },
  {
    id: 38,
    name: "Lyme Disease",
    description:
      "Lyme Disease is a bacterial infection transmitted through tick bites, causing fever, headache, fatigue, and a characteristic skin rash.",
    category: "Infectious Diseases",
    categoryId: 3,
  },
  {
    id: 39,
    name: "Cystic Fibrosis",
    description:
      "Cystic Fibrosis is a genetic disorder that affects the lungs and digestive system, leading to severe respiratory and gastrointestinal problems.",
    category: "Genetic Disorders",
    categoryId: 4,
  },
  {
    id: 40,
    name: "Sickle Cell Anemia",
    description:
      "Sickle Cell Anemia is a hereditary blood disorder characterized by red blood cells that assume an abnormal, rigid, sickle shape.",
    category: "Genetic Disorders",
    categoryId: 4,
  },
  {
    id: 41,
    name: "Hemophilia",
    description:
      "Hemophilia is a genetic disorder in which blood doesn’t clot normally because it lacks sufficient clotting proteins.",
    category: "Genetic Disorders",
    categoryId: 4,
  },
  {
    id: 42,
    name: "Huntington's Disease",
    description:
      "Huntington's Disease is a genetic neurological disorder that causes the progressive breakdown of nerve cells in the brain.",
    category: "Genetic Disorders",
    categoryId: 4,
  },
  {
    id: 43,
    name: "Down Syndrome",
    description:
      "Down Syndrome is a genetic disorder caused by an extra chromosome 21, leading to developmental delays and distinct facial features.",
    category: "Genetic Disorders",
    categoryId: 4,
  },
  {
    id: 44,
    name: "Phenylketonuria (PKU)",
    description:
      "PKU is a rare inherited disorder that causes the buildup of phenylalanine in the body, leading to intellectual disabilities and health issues.",
    category: "Genetic Disorders",
    categoryId: 4,
  },
  {
    id: 45,
    name: "Thalassemia",
    description:
      "Thalassemia is a genetic blood disorder that causes the body to produce less hemoglobin than normal, leading to anemia.",
    category: "Genetic Disorders",
    categoryId: 4,
  },
  {
    id: 46,
    name: "Marfan Syndrome",
    description:
      "Marfan Syndrome is a genetic disorder that affects connective tissue, causing issues with the heart, eyes, blood vessels, and skeleton.",
    category: "Genetic Disorders",
    categoryId: 4,
  },
  {
    id: 47,
    name: "Ehlers-Danlos Syndrome",
    description:
      "Ehlers-Danlos Syndrome is a group of inherited disorders that affect connective tissues, leading to overly flexible joints and stretchy skin.",
    category: "Genetic Disorders",
    categoryId: 4,
  },
  {
    id: 48,
    name: "Fragile X Syndrome",
    description:
      "Fragile X Syndrome is a genetic condition causing intellectual disability, behavioral and learning challenges, and various physical characteristics.",
    category: "Genetic Disorders",
    categoryId: 4,
  },
  {
    id: 49,
    name: "Turner Syndrome",
    description:
      "Turner Syndrome is a genetic disorder in females where one of the X chromosomes is missing or partially missing, leading to developmental issues.",
    category: "Genetic Disorders",
    categoryId: 4,
  },
  {
    id: 50,
    name: "Klinefelter Syndrome",
    description:
      "Klinefelter Syndrome is a genetic condition in males where they have an extra X chromosome, leading to infertility and other symptoms.",
    category: "Genetic Disorders",
    categoryId: 4,
  },

  {
    id: 51,
    name: "Addison's Disease",
    description:
      "Addison's Disease is a disorder in which the adrenal glands don't produce enough hormones, leading to fatigue, low blood pressure, and weight loss.",
    category: "Endocrine Disorders",
    categoryId: 10,
  },
  {
    id: 52,
    name: "Cushing's Syndrome",
    description:
      "Cushing's Syndrome is caused by high levels of cortisol, leading to weight gain, high blood pressure, and changes in skin appearance.",
    category: "Endocrine Disorders",
    categoryId: 10,
  },
  {
    id: 53,
    name: "Hypothyroidism",
    description:
      "Hypothyroidism is a condition where the thyroid gland doesn't produce enough hormones, leading to fatigue, weight gain, and depression.",
    category: "Endocrine Disorders",
    categoryId: 10,
  },
  {
    id: 54,
    name: "Hyperthyroidism",
    description:
      "Hyperthyroidism is a condition where the thyroid produces too much hormone, causing weight loss, anxiety, and rapid heartbeat.",
    category: "Endocrine Disorders",
    categoryId: 10,
  },
  {
    id: 55,
    name: "Graves' Disease",
    description:
      "Graves' Disease is an autoimmune disorder that causes hyperthyroidism, where the thyroid overproduces hormones.",
    category: "Endocrine Disorders",
    categoryId: 10,
  },
  {
    id: 56,
    name: "Hashimoto's Thyroiditis",
    description:
      "Hashimoto's Thyroiditis is an autoimmune disorder that damages the thyroid gland, leading to hypothyroidism.",
    category: "Endocrine Disorders",
    categoryId: 10,
  },
  {
    id: 57,
    name: "Pheochromocytoma",
    description:
      "Pheochromocytoma is a rare tumor of the adrenal glands that can cause high blood pressure, headaches, and sweating.",
    category: "Endocrine Disorders",
    categoryId: 10,
  },
  {
    id: 58,
    name: "Polycystic Ovary Syndrome (PCOS)",
    description:
      "PCOS is a hormonal disorder causing enlarged ovaries with small cysts, leading to irregular menstrual cycles and infertility.",
    category: "Endocrine Disorders",
    categoryId: 10,
  },
  {
    id: 59,
    name: "Diabetic Ketoacidosis",
    description:
      "Diabetic Ketoacidosis is a life-threatening complication of diabetes, where the body produces excess blood acids (ketones).",
    category: "Endocrine Disorders",
    categoryId: 10,
  },
  {
    id: 60,
    name: "Acromegaly",
    description:
      "Acromegaly is a hormonal disorder that results from the pituitary gland producing too much growth hormone, leading to enlarged body parts.",
    category: "Endocrine Disorders",
    categoryId: 10,
  },
  {
    id: 61,
    name: "Gigantism",
    description:
      "Gigantism is a condition caused by an overproduction of growth hormone during childhood, leading to excessive growth and height.",
    category: "Endocrine Disorders",
    categoryId: 10,
  },
  {
    id: 62,
    name: "Pituitary Adenoma",
    description:
      "Pituitary Adenoma is a usually benign tumor of the pituitary gland, affecting hormone production and causing various endocrine disorders.",
    category: "Endocrine Disorders",
    categoryId: 10,
  },
  {
    id: 63,
    name: "Hyperparathyroidism",
    description:
      "Hyperparathyroidism is a condition where the parathyroid glands produce too much parathyroid hormone, causing high calcium levels.",
    category: "Endocrine Disorders",
    categoryId: 10,
  },
  {
    id: 64,
    name: "Hypoparathyroidism",
    description:
      "Hypoparathyroidism is a condition where the parathyroid glands produce insufficient hormone, causing low calcium levels.",
    category: "Endocrine Disorders",
    categoryId: 10,
  },
  {
    id: 65,
    name: "Rheumatoid Arthritis",
    description:
      "Rheumatoid Arthritis is an autoimmune disorder that causes chronic inflammation of the joints, leading to pain and swelling.",
    category: "Autoimmune Diseases",
    categoryId: 2,
  },
  {
    id: 66,
    name: "Systemic Lupus Erythematosus",
    description:
      "Systemic Lupus Erythematosus (Lupus) is an autoimmune disease where the immune system attacks healthy tissues, causing widespread inflammation.",
    category: "Autoimmune Diseases",
    categoryId: 2,
  },
  {
    id: 67,
    name: "Multiple Sclerosis",
    description:
      "Multiple Sclerosis is a chronic illness where the immune system attacks the protective covering of nerves, leading to communication problems between the brain and body.",
    category: "Autoimmune Diseases",
    categoryId: 2,
  },
  {
    id: 68,
    name: "Psoriasis",
    description:
      "Psoriasis is a skin condition that causes skin cells to build up and form scales and itchy, dry patches.",
    category: "Autoimmune Diseases",
    categoryId: 2,
  },
  {
    id: 69,
    name: "Celiac Disease",
    description:
      "Celiac Disease is an autoimmune disorder where the ingestion of gluten leads to damage in the small intestine.",
    category: "Autoimmune Diseases",
    categoryId: 2,
  },
  {
    id: 70,
    name: "Graves' Disease",
    description:
      "Graves' Disease is an autoimmune disorder that leads to hyperthyroidism, causing symptoms like weight loss, anxiety, and bulging eyes.",
    category: "Autoimmune Diseases",
    categoryId: 2,
  },
  {
    id: 71,
    name: "Addison's Disease",
    description:
      "Addison's Disease is a disorder where the adrenal glands don't produce enough hormones, leading to fatigue and low blood pressure.",
    category: "Autoimmune Diseases",
    categoryId: 2,
  },
  {
    id: 72,
    name: "Type 1 Diabetes",
    description:
      "Type 1 Diabetes is an autoimmune condition where the body's immune system attacks insulin-producing cells in the pancreas.",
    category: "Autoimmune Diseases",
    categoryId: 2,
  },
  {
    id: 73,
    name: "Sjogren's Syndrome",
    description:
      "Sjogren's Syndrome is an autoimmune disorder that affects the glands responsible for tears and saliva, leading to dry eyes and mouth.",
    category: "Autoimmune Diseases",
    categoryId: 2,
  },
  {
    id: 74,
    name: "Scleroderma",
    description:
      "Scleroderma is an autoimmune disease that leads to hardening and tightening of the skin and connective tissues.",
    category: "Autoimmune Diseases",
    categoryId: 2,
  },
  {
    id: 75,
    name: "Myasthenia Gravis",
    description:
      "Myasthenia Gravis is an autoimmune neuromuscular disease that leads to varying degrees of skeletal muscle weakness.",
    category: "Autoimmune Diseases",
    categoryId: 2,
  },
  {
    id: 76,
    name: "Guillain-Barre Syndrome",
    description:
      "Guillain-Barre Syndrome is a rare autoimmune disorder where the immune system attacks the peripheral nervous system, leading to muscle weakness and paralysis.",
    category: "Autoimmune Diseases",
    categoryId: 2,
  },
  {
    id: 77,
    name: "Dermatomyositis",
    description:
      "Dermatomyositis is an autoimmune disease that causes muscle weakness and a distinctive skin rash.",
    category: "Autoimmune Diseases",
    categoryId: 2,
  },
  {
    id: 78,
    name: "Hashimoto's Thyroiditis",
    description:
      "Hashimoto's Thyroiditis is an autoimmune disorder where the immune system attacks the thyroid, leading to hypothyroidism.",
    category: "Autoimmune Diseases",
    categoryId: 2,
  },
  {
    id: 79,
    name: "Ankylosing Spondylitis",
    description:
      "Ankylosing Spondylitis is an inflammatory disease that can cause some of the vertebrae in the spine to fuse, leading to reduced flexibility.",
    category: "Autoimmune Diseases",
    categoryId: 2,
  },
  {
    id: 80,
    name: "Vitiligo",
    description:
      "Vitiligo is an autoimmune condition where the immune system attacks pigment cells, causing loss of skin color in patches.",
    category: "Autoimmune Diseases",
    categoryId: 2,
  },
  {
    id: 81,
    name: "Alopecia Areata",
    description:
      "Alopecia Areata is an autoimmune disorder that causes hair loss, typically in patches.",
    category: "Autoimmune Diseases",
    categoryId: 2,
  },
  {
    id: 82,
    name: "Thyroid Eye Disease",
    description:
      "Thyroid Eye Disease is an autoimmune disorder linked to hyperthyroidism, causing inflammation and swelling of the eyes.",
    category: "Autoimmune Diseases",
    categoryId: 2,
  },
  {
    id: 83,
    name: "Pemphigus Vulgaris",
    description:
      "Pemphigus Vulgaris is a rare autoimmune disease that causes painful blisters on the skin and mucous membranes.",
    category: "Autoimmune Diseases",
    categoryId: 2,
  },
  {
    id: 84,
    name: "Rhabdomyolysis",
    description:
      "Rhabdomyolysis is a serious condition caused by muscle injury, leading to the breakdown of muscle tissue and release of harmful proteins into the blood.",
    category: "Musculoskeletal Disorders",
    categoryId: 11,
  },
  {
    id: 85,
    name: "Osteoporosis",
    description:
      "Osteoporosis is a bone disease that occurs when the body loses too much bone or makes too little, leading to brittle and fragile bones.",
    category: "Musculoskeletal Disorders",
    categoryId: 11,
  },
  {
    id: 86,
    name: "Osteoarthritis",
    description:
      "Osteoarthritis is a degenerative joint disease that causes cartilage breakdown, leading to pain and stiffness.",
    category: "Musculoskeletal Disorders",
    categoryId: 11,
  },
  {
    id: 87,
    name: "Fibromyalgia",
    description:
      "Fibromyalgia is a condition characterized by widespread musculoskeletal pain, fatigue, and tenderness in localized areas.",
    category: "Musculoskeletal Disorders",
    categoryId: 11,
  },
  {
    id: 88,
    name: "Muscular Dystrophy",
    description:
      "Muscular Dystrophy is a group of genetic disorders that cause progressive muscle weakness and loss of muscle mass.",
    category: "Musculoskeletal Disorders",
    categoryId: 11,
  },
  {
    id: 89,
    name: "Tendinitis",
    description:
      "Tendinitis is inflammation or irritation of a tendon, causing pain and tenderness just outside a joint.",
    category: "Musculoskeletal Disorders",
    categoryId: 11,
  },
  {
    id: 90,
    name: "Carpal Tunnel Syndrome",
    description:
      "Carpal Tunnel Syndrome is a condition caused by pressure on the median nerve in the wrist, leading to pain and numbness in the hand.",
    category: "Musculoskeletal Disorders",
    categoryId: 11,
  },
  {
    id: 91,
    name: "Plantar Fasciitis",
    description:
      "Plantar Fasciitis is inflammation of the tissue that runs across the bottom of the foot, causing heel pain.",
    category: "Musculoskeletal Disorders",
    categoryId: 11,
  },
  {
    id: 92,
    name: "Chronic Fatigue Syndrome",
    description:
      "Chronic Fatigue Syndrome is a disorder characterized by extreme fatigue that doesn't improve with rest and can't be explained by an underlying condition.",
    category: "Neurological Disorders",
    categoryId: 1,
  },
  {
    id: 93,
    name: "Epilepsy",
    description:
      "Epilepsy is a neurological disorder in which brain activity becomes abnormal, causing seizures or periods of unusual behavior and sensations.",
    category: "Neurological Disorders",
    categoryId: 1,
  },
  {
    id: 94,
    name: "Stroke",
    description:
      "A stroke occurs when the blood supply to part of the brain is interrupted or reduced, preventing brain tissue from getting oxygen and nutrients.",
    category: "Neurological Disorders",
    categoryId: 1,
  },
  {
    id: 95,
    name: "Migraine",
    description:
      "Migraine is a neurological condition that causes severe, debilitating headaches and often includes nausea, vomiting, and sensitivity to light and sound.",
    category: "Neurological Disorders",
    categoryId: 1,
  },
  {
    id: 96,
    name: "Amyotrophic Lateral Sclerosis (ALS)",
    description:
      "ALS is a progressive neurodegenerative disease that affects nerve cells in the brain and spinal cord, causing muscle weakness and atrophy.",
    category: "Neurological Disorders",
    categoryId: 1,
  },
  {
    id: 97,
    name: "Guillain-Barré Syndrome",
    description:
      "Guillain-Barré Syndrome is a rare neurological disorder where the body's immune system mistakenly attacks the peripheral nervous system.",
    category: "Neurological Disorders",
    categoryId: 1,
  },
  {
    id: 98,
    name: "Tay-Sachs Disease",
    description:
      "Tay-Sachs Disease is a rare genetic disorder that destroys nerve cells in the brain and spinal cord, leading to severe mental and physical deterioration.",
    category: "Genetic Disorders",
    categoryId: 4,
  },
  {
    id: 99,
    name: "Gaucher Disease",
    description:
      "Gaucher Disease is a genetic disorder where fatty substances accumulate in certain organs and bones, leading to enlargement and organ dysfunction.",
    category: "Genetic Disorders",
    categoryId: 4,
  },
  {
    id: 100,
    name: "Phenylketonuria (PKU)",
    description:
      "PKU is a rare inherited disorder that causes an amino acid called phenylalanine to build up in the body, leading to intellectual disability.",
    category: "Genetic Disorders",
    categoryId: 4,
  },
];

const categories = [
  {
    categoryId: 0,
    categoryName: "Other",
    ICDCode: "000-000",
    description: "Not in the list",
  },
  {
    categoryId: 1,
    categoryName: "Neurological Disorders",
    ICDCode: "G00-G99",
    description:
      "Neurological disorders include diseases of the brain, spinal cord, and nerves, such as Alzheimer's disease, Parkinson's disease, epilepsy, and multiple sclerosis.",
  },
  {
    categoryId: 2,
    categoryName: "Autoimmune Diseases",
    ICDCode: "M00-M99",
    description:
      "Autoimmune diseases occur when the immune system mistakenly attacks the body, causing conditions such as rheumatoid arthritis, lupus, and multiple sclerosis.",
  },
  {
    categoryId: 3,
    categoryName: "Infectious Diseases",
    ICDCode: "A00-B99",
    description:
      "Infectious diseases are caused by pathogens such as bacteria, viruses, fungi, and parasites. Examples include tuberculosis, HIV/AIDS, and influenza.",
  },
  {
    categoryId: 4,
    categoryName: "Genetic Disorders",
    ICDCode: "Q00-Q99",
    description:
      "Genetic disorders result from changes in an individual's DNA and include conditions such as Down syndrome, cystic fibrosis, and sickle cell anemia.",
  },
  {
    categoryId: 5,
    categoryName: "Lifestyle-Related Diseases",
    ICDCode: "E66",
    description:
      "Lifestyle-related diseases are often linked to habits such as poor diet, lack of exercise, and smoking, leading to conditions like obesity, type 2 diabetes, and heart disease.",
  },
  {
    categoryId: 6,
    categoryName: "Cardiovascular Diseases",
    ICDCode: "I00-I99",
    description:
      "Cardiovascular diseases affect the heart and blood vessels and include hypertension, coronary artery disease, and stroke.",
  },
  {
    categoryId: 7,
    categoryName: "Cancers",
    ICDCode: "C00-D49",
    description:
      "Cancers are characterized by the uncontrolled growth of abnormal cells and include various forms of malignancies such as lung cancer, breast cancer, and leukemia.",
  },
  {
    categoryId: 8,
    categoryName: "Digestive Disorders",
    ICDCode: "K00-K95",
    description:
      "Digestive disorders affect the gastrointestinal tract, liver, pancreas, and gallbladder. Examples include Crohn's disease, irritable bowel syndrome, and liver cirrhosis.",
  },
  {
    categoryId: 9,
    categoryName: "Respiratory Diseases",
    ICDCode: "J00-J99",
    description:
      "Respiratory diseases affect the lungs and airways, causing conditions like asthma, chronic obstructive pulmonary disease (COPD), and pneumonia.",
  },
  {
    categoryId: 10,
    categoryName: "Endocrine Disorders",
    ICDCode: "E00-E89",
    description:
      "Endocrine disorders involve imbalances or dysfunctions in hormone production, leading to conditions such as diabetes, hyperthyroidism, and Addison's disease.",
  },
  {
    categoryId: 11,
    categoryName: "Musculoskeletal Disorders",
    ICDCode: "M00-M99",
    description:
      "Musculoskeletal disorders affect the muscles, bones, joints, and connective tissue, and include conditions such as osteoporosis, arthritis, and muscular dystrophy.",
  },
  {
    categoryId: 12,
    categoryName: "Mental Health Disorders",
    ICDCode: "F00-F99",
    description:
      "Mental health disorders affect mood, thinking, and behavior, with examples including depression, schizophrenia, anxiety disorders, and bipolar disorder.",
  },
  {
    categoryId: 13,
    categoryName: "Blood Disorders",
    ICDCode: "D50-D89",
    description:
      "Blood disorders affect the components of blood, such as red blood cells, white blood cells, platelets, and plasma. Examples include anemia, hemophilia, and leukemia.",
  },
  {
    categoryId: 14,
    categoryName: "Dermatological Disorders",
    ICDCode: "L00-L99",
    description:
      "Dermatological disorders involve the skin, hair, and nails. Common conditions include eczema, psoriasis, acne, and skin infections.",
  },
  {
    categoryId: 15,
    categoryName: "Sexually Transmitted Infections",
    ICDCode: "A50-A64",
    description:
      "Sexually transmitted infections (STIs) are spread primarily through sexual contact and include HIV, syphilis, gonorrhea, and chlamydia.",
  },
  {
    categoryId: 16,
    categoryName: "Developmental Disorders",
    ICDCode: "F80-F89",
    description:
      "Developmental disorders affect physical, learning, language, or behavioral development. Examples include autism spectrum disorder, intellectual disabilities, and ADHD.",
  },
  {
    categoryId: 17,
    categoryName: "Eye and Vision Disorders",
    ICDCode: "H00-H59",
    description:
      "Eye and vision disorders affect the eyes and can impair vision. Conditions include glaucoma, cataracts, macular degeneration, and conjunctivitis.",
  },
  {
    categoryId: 18,
    categoryName: "Ear, Nose, and Throat Disorders",
    ICDCode: "H60-H95",
    description:
      "Ear, nose, and throat disorders affect sensory and functional organs in the head and neck, including conditions like sinusitis, hearing loss, and tonsillitis.",
  },
  {
    categoryId: 19,
    categoryName: "Kidney and Urinary Tract Diseases",
    ICDCode: "N00-N99",
    description:
      "Kidney and urinary tract diseases include conditions that affect the kidneys, bladder, and urinary system, such as chronic kidney disease, nephritis, and urinary tract infections.",
  },
  {
    categoryId: 20,
    categoryName: "Liver and Biliary Disorders",
    ICDCode: "K70-K77",
    description:
      "Liver and biliary disorders affect the liver, gallbladder, and bile ducts. Conditions include hepatitis, cirrhosis, and gallstones.",
  },
  {
    categoryId: 21,
    categoryName: "Reproductive Health Disorders",
    ICDCode: "N00-N99",
    description:
      "Reproductive health disorders affect the reproductive organs and fertility, including conditions such as polycystic ovary syndrome (PCOS), endometriosis, and infertility.",
  },
  {
    categoryId: 22,
    categoryName: "Metabolic Disorders",
    ICDCode: "E70-E88",
    description:
      "Metabolic disorders involve the body's processing of nutrients and energy. Examples include diabetes, metabolic syndrome, and hyperlipidemia.",
  },
  {
    categoryId: 23,
    categoryName: "Allergic Diseases",
    ICDCode: "J30-J39",
    description:
      "Allergic diseases occur when the immune system reacts to harmless substances as though they are dangerous. Common conditions include allergic rhinitis, asthma, and food allergies.",
  },
  {
    categoryId: 24,
    categoryName: "Congenital Disorders",
    ICDCode: "Q00-Q99",
    description:
      "Congenital disorders are present at birth and can affect various body systems. Examples include spina bifida, congenital heart defects, and cleft lip.",
  },
  {
    categoryId: 25,
    categoryName: "Poisoning and Toxic Effects",
    ICDCode: "T36-T50",
    description:
      "Poisoning and toxic effects occur due to exposure to harmful substances, leading to conditions like lead poisoning, drug overdose, and chemical toxicity.",
  },
];

const bodyParts = [
  "Other",
  "Head",
  "Neck",
  "Chest",
  "Abdomen",
  "Pelvis",
  "Upper Extremity",
  "Lower Extremity",
  "Back",
  "Skin",
  "Mouth",
  "Eyes",
  "Ears",
  "Nose",
  "Throat",
  "Heart",
  "Lungs",
  "Liver",
  "Kidneys",
  "Pancreas",
  "Gallbladder",
  "Intestines",
  "Bladder",
  "Vagina",
  "Urethra",
  "Uterus",
  "Fallopian Tubes",
  "Ovaries",
  "Testes",
  "Penis",
  "Scrotum",
  "Breasts",
  "Hips",
];
const bodyPartCategories = [
  "Other",
  "Head and Neck",
  "Chest and Abdomen",
  "Pelvis and Lower Extremity",
  "Upper Extremity",
  "Back and Spine",
  "Skin and Soft Tissue",
  "Mouth and Teeth",
  "Internal Organs",
];

const bodyFocus = [
  "Other",
  "Cell",
  "Tissue",
  "Organ",
  "System",
  "Body",
  "Whole",
];

const dataTypes = [
  "Image",
  "Video",
  "Text",
  "Audio",
  "3D",
  "Signal",
  "Other",
  "csv",
];

export {
  diseases,
  categories,
  bodyParts,
  bodyPartCategories,
  bodyFocus,
  dataTypes,
};
