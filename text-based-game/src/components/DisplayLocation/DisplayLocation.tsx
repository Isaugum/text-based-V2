import { useSelector, useDispatch } from 'react-redux';

const DisplayLocation = () => {

    const player = useSelector((state: any) => state.player);
    const locations = useSelector((state: any) => state.locations);
    const items = useSelector((state: any) => state.items);
    const NPCS = useSelector((state: any) => state.npcs);
    const playerLocation = locations[player.location];

    return (
        <div>
            <h2>LOCATION: {playerLocation.name}</h2>
            <h3>AREA: {playerLocation.area}</h3>
            <h3>DESCRIPTION:<br />{playerLocation.description + " " +
                Object.keys(playerLocation.contains).map((item: any) => {
                    const itemID = playerLocation.contains[item];
                    return items[itemID].locationDescription;
                })}
                {
                    Object.keys(playerLocation.presentNPCS).map((NPC: any) => {
                        const npcID = playerLocation.presentNPCS[NPC];
                        return NPCS[npcID].locationDescription;
                    })
                }
            </h3>
            <br />
            <div>{

            }</div>
        </div>
    )
}

export { DisplayLocation };