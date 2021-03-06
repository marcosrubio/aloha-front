import React, { useState, useEffect, useContext } from "react";
import MapPanelImage from "../MapPanelImage";
import MapPanelImageDropzone from "../MapPanelImageDropzone";
import createCRUDHook from "../../../hooks/crud";
import CRUDContext from "../../../components/CRUDContext";

function MapPanel({ floor }) {
  const [image, setImage] = useState(floor.imageId);
  // Change map image when floor changes
  useEffect(() => void setImage(floor.imageId), [floor]);

  const { floorsCRUD } = useContext(CRUDContext);
  const updateImage = imageUrl => {
    floorsCRUD.update({ ...floor, imageUrl });
  };

  const useWorkstations = createCRUDHook(`/floors/${floor.id}/workstations`);
  const workstationsCRUD = useWorkstations();
  useEffect(() => workstationsCRUD.fetch(), [floor.id]);
  const workstations = workstationsCRUD.store;

  return (
    <div className={`map-panel${workstations ? "" : " loading"}`}>
      <div className="map-panel-display-area">
        {image ? (
          workstations && (
            <MapPanelImage
              image={image}
              alt={floor.name}
              workstations={workstations}
              onCreateWorkstation={workstation =>
                workstationsCRUD.create(workstation)
              }
              workstationsCRUD={workstationsCRUD}
            />
          )
        ) : (
          <MapPanelImageDropzone onDrop={updateImage} />
        )}
      </div>
    </div>
  );
}

export default MapPanel;
