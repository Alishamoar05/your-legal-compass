import pandas as pd
import numpy as np
import joblib
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

def generate_synthetic_data(num_samples=2000):
    np.random.seed(42)
    
    # Features (on a scale of 0 to 1)
    evidence_strength = np.random.uniform(0.1, 1.0, num_samples)
    precedent_alignment = np.random.uniform(0.1, 1.0, num_samples)
    jurisdiction_favorability = np.random.uniform(0.1, 1.0, num_samples)
    documentation_completeness = np.random.uniform(0.1, 1.0, num_samples)
    statute_of_limitations_risk = np.random.uniform(0.0, 1.0, num_samples)
    
    # Weights for the synthetic target variable
    weights = np.array([0.35, 0.25, 0.15, 0.25, -0.20])
    
    features = np.column_stack((
        evidence_strength, 
        precedent_alignment, 
        jurisdiction_favorability,
        documentation_completeness,
        statute_of_limitations_risk
    ))
    
    # Calculate a raw score based on the weights + some noise
    noise = np.random.normal(0, 0.1, num_samples)
    raw_scores = features.dot(weights) + noise
    
    # Convert raw scores to probabilities roughly between 0 and 1
    # Min-max scaling raw scores for better translation to probabilities
    min_score = raw_scores.min()
    max_score = raw_scores.max()
    probabilities = (raw_scores - min_score) / (max_score - min_score)
    
    # Make outcomes mostly deterministic based on threshold,
    # but randomly flip 10% to simulate real-world legal uncertainty
    outcomes = (probabilities > 0.5).astype(int)
    flip_indices = np.random.choice(num_samples, size=int(0.1 * num_samples), replace=False)
    outcomes[flip_indices] = 1 - outcomes[flip_indices]
    
    df = pd.DataFrame({
        'Evidence Strength': evidence_strength,
        'Precedent Alignment': precedent_alignment,
        'Jurisdiction Favorability': jurisdiction_favorability,
        'Documentation Completeness': documentation_completeness,
        'Statute of Limitations Risk': statute_of_limitations_risk,
        'Outcome': outcomes
    })
    
    return df

def train_and_save_model():
    print("Generating synthetic dataset...")
    df = generate_synthetic_data(5000)
    
    X = df.drop('Outcome', axis=1)
    y = df['Outcome']
    
    print("Splitting dataset into train and test sets...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training LogisticRegression...")
    model = LogisticRegression(random_state=42)
    model.fit(X_train, y_train)
    
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model trained successfully with accuracy: {accuracy:.4f}")
    
    model_path = "case_outcome_model.pkl"
    joblib.dump(model, model_path)
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    train_and_save_model()
