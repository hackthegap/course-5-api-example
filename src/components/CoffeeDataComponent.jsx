import { useState, useEffect } from "react" //hooks

function CoffeeDataComponent() {

    const[coffees, setCoffees] = useState([]);

    useEffect(() => {

        const fetchCoffeeData = async () => {
        
            const response = await fetch("https://api.sampleapis.com/coffee/hot");
            if(!response.ok){
                console.log("ops, we have a problem");
            }

            const data = await response.json();
            console.log(data);
            setCoffees(data);
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

export default CoffeeDataComponent