import { useSelector } from "react-redux";



const DisplayInspection = () => {

    const gameState = useSelector((state: any) => state.gameState);
    const player = useSelector((state: any) => state.player);
    const locations = useSelector((state: any) => state.locations);
    const items = useSelector((state: any) => state.items);
    const playerLocation = locations[player.location];

    return (
        <div>
            <h2>LOCATION: {playerLocation.name}</h2>
            <h3>AREA: {playerLocation.area}</h3>
            <br />
            <h3>{items[gameState.stateFocus].description}</h3>
            <h3>{
                Object.keys(items[gameState.stateFocus].contains).map((item: any) => {
                    const itemID = items[gameState.stateFocus].contains[item];
                    return items[itemID].locationDescription;
                })}</h3>
            <div>{

            }</div>
        </div>
    )
}

export { DisplayInspection };