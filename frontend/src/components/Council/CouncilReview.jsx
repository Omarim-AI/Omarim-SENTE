import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';

const CouncilReview = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await apiClient.get('/api/council/reviews');
                setReviews(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (loading) {
        return <div>Loading Council reviews...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="council-review-container">
            <h2>Council Review Board</h2>
            {reviews.length === 0 ? (
                <p>No actions are currently pending review.</p>
            ) : (
                <ul className="review-list">
                    {reviews.map((review, index) => (
                        <li key={index} className="review-item">
                            <h3>Action Details</h3>
                            <p><strong>Description:</strong> {review.action.description}</p>
                            <p><strong>Impact:</strong> {review.action.impact}</p>
                            {review.action.domain && <p><strong>Domain:</strong> {review.action.domain}</p>}
                            
                            <h4>Evaluation</h4>
                            <p><strong>Status:</strong> {review.evaluation.status}</p>
                            <p><strong>Score:</strong> {review.evaluation.score}</p>
                            <p><strong>Recommendation:</strong> {review.evaluation.recommendation}</p>

                            <h4>Violations</h4>
                            <ul>
                                {review.evaluation.violations.map((violation, vIndex) => (
                                    <li key={vIndex}>
                                        <p><strong>Principle:</strong> {violation.principle}</p>
                                        <p><strong>Severity:</strong> {violation.severity}</p>
                                        <p><strong>Recommendation:</strong> {violation.recommendation}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CouncilReview;
