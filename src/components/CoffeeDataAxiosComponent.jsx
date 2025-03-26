import { useState, useEffect } from "react" //hooks
import axios from 'axios'

function CoffeeAxiosDataComponent() {

    const[coffees, setCoffees] = useState([]);

    useEffect(() => {

        const fetchCoffeeData = async () => {
        
            axios.get("https://api.sampleapis.com/coffee/hot")
                .then(response =>{
                    setCoffees(response.data);
                    console.log(response.data);
                });
        };
        
        fetchCoffeeData();
    }, []);

    return (

        <div>
            {coffees.map((coffee) =>
                <div id="coffeeCard">
                    <h3>{coffee.title} - $ {coffee.price}</h3>
                    <h4>{coffee.description}</h4>
                </div>
            )}
        </div>
    )

}

export default CoffeeAxiosDataComponent