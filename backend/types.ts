export type ZeldaGame = {
    title: string; // "Ocarina of Time"  "Breath of the Wild"...
    category: "Open Air" |"Classic" |"Action 3D" |"Side-scrolling";
    console: string; //"Nintendo 64" "GameBoy" "Switch"...
    platform: "HomeConsole" | "Hybrid" | "Portable";
    releaseYear: number; // 2017, 1998,...
    description: string; //"Link si sveglia..."
    story: string; 
    image: string;
    vote: number; // 1-100
    remake?: boolean;
    remakePlatform?: string
}