import { useSelector, useDispatch } from 'react-redux';

const DisplayPlayer = () => {

    const player = useSelector((state: any) => state.player);

    return (
        <div>
            <h1>{player.name.toUpperCase()}</h1>
            <h3>HP: {player.health}</h3>
            <h3>STAMINA: {player.stamina}</h3>
            <h3>GOLD: {player.gold}</h3>
            <div><h3>INVENTORY:</h3>{
                player.inventory.map((item: any) => {
                    return <h4 key={item.id}>{item.name}<br /></h4>
                })
            }</div>
        </div >
    )
}

export { DisplayPlayer };
