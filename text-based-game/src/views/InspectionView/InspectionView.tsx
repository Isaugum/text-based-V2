import { DisplayInspection, DisplayPlayer } from "../../components"
import { InspectionInput } from "../../components/InspectionInput";


const InspectionView = () => {

    return (
        <>
            < DisplayPlayer />
            <br /><br />
            < DisplayInspection />
            <br /><br />
            < InspectionInput />
        </>
    )
}

export { InspectionView };