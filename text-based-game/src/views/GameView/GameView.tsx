import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ConversationInput, DisplayConsole, DisplayConversation, DisplayInspection, DisplayLocation, DisplayPlayer, GameInput } from "../../components"
import { InspectionInput } from "../../components/InspectionInput";

import style from './style/GameView.module.css';


const GameView = () => {

    const [actionLogs, setActionLogs] = useState<string[]>([]);

    const gameState = useSelector((state: any) => state.gameState);

    useEffect(() => {
        if (actionLogs.length > 5) {
            console.log(actionLogs);
            const logsFilter = actionLogs.filter((log, index) => {
                return index !== 0;
            })
            setActionLogs(logsFilter);
        }
    })

    return (
        <>
            <div className={style.container} >
                < DisplayConsole actionLogs={actionLogs} />
                < DisplayPlayer />
                <br /><br />
                {
                    gameState.state === "game-state" &&
                    <>
                        < DisplayLocation />
                        <br /><br />
                        < GameInput setLogs={setActionLogs} />
                    </>
                }
                {
                    gameState.state === "inspect-state" &&
                    <>
                        < DisplayInspection />
                        <br /><br />
                        < InspectionInput setLogs={setActionLogs} />
                    </>
                }
                {
                    gameState.state === "talk-state" &&
                    <>
                        < DisplayConversation />
                        <br /><br />
                        < ConversationInput setLogs={setActionLogs} />
                    </>
                }
            </div>
        </>
    )
}

export { GameView };