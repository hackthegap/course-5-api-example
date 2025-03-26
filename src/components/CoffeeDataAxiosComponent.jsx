import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CoffeeDataComponent.module.css';

function CoffeeAxiosDataComponent() {
    const [coffees, setCoffees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Cancel token for axios request cleanup
        const source = axios.CancelToken.source();

        const fetchCoffeeData = () => {
            axios.get('https://api.sampleapis.com/coffee/hot', {
                cancelToken: source.token
            })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Failed to fetch coffee data');
                }
                setCoffees(response.data);
            })
            .catch(err => {
                if (!axios.isCancel(err)) {
                    setError(err.message);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
        };

        fetchCoffeeData();

        // Cleanup function to cancel request if component unmounts
        return () => {
            source.cancel('Component unmounted, request canceled');
        };
    }, []);

    if (isLoading) {
        return <div className={styles.loading}>Loading coffee data...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error: {error}</div>;
    }

    return (
        <div className={styles.coffeeContainer}>
            <h2>Our Coffee Selection</h2>
            <ul className={styles.coffeeList}>
                {coffees.map((coffee) => (
                    <li key={coffee.id} className={styles.coffeeItem}>
                        <h3>{coffee.title}</h3>
                        <p>{coffee.description}</p>
                        {coffee.image && (
                            <img width={200}
                                src={coffee.image} 
                                alt={coffee.title} 
                                className={styles.coffeeImage}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CoffeeAxiosDataComponent;