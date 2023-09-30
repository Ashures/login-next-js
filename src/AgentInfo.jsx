export default function AgentInfo({ info }) {
    return (
        <div className="agent-info">
            <ul>
               <li id="agent-name">name: {info.symbol}</li>
               <li id="agent-credits">credits: {info.credits}</li>
               <li id="agent-ship-count">ships: {info.shipCount}</li>
               <li id="agent-headquarters">headquarters: {info.headquarters}</li>
               <li id="agent-starting-faction">starting faction: {info.startingFaction}</li>
            </ul>
        </div>
    );
};