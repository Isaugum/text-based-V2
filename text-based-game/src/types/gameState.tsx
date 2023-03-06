

export interface GameState {
    screen: string;
    state: string;
    previousScreen: string;
    previousState: string;
    stateFocus?: number;
}