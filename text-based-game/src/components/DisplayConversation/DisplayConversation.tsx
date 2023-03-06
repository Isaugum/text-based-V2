import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { processResponse } from "../../state/reducers/npcReducer";



const DisplayConversation = () => {

    const dispatch = useDispatch();

    const gameState = useSelector((state: any) => state.gameState);
    const player = useSelector((state: any) => state.player);
    const locations = useSelector((state: any) => state.locations);
    const items = useSelector((state: any) => state.items);
    const NPCS = useSelector((state: any) => state.npcs);
    const playerLocation = locations[player.location];

    const talkingNPC = NPCS[gameState.stateFocus];

    useEffect(() => {
        const eventIDs = player.events.filter((item: any) => {
            return item === talkingNPC.trigger
        });

        if (eventIDs.length > 0) {
            dispatch(processResponse({ npcID: gameState.stateFocus, response: "trigger" }));
        }
    })

    return (
        <div>
            <h2>LOCATION: {playerLocation.name}</h2>
            <h3>AREA: {playerLocation.area}</h3>
            <br />
            <h3>{talkingNPC.name}</h3>
            <h3>{talkingNPC.dialogueTree[talkingNPC.currentNode].text}</h3>
            <div>{
                talkingNPC.dialogueTree[talkingNPC.currentNode].responses.map((res: any, index: number) => {
                    const theIndex = index + 1;
                    return <p>{theIndex + ". " + res.text}</p>
                })
            }</div>
        </div>
    )
}

export { DisplayConversation };