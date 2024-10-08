import React, { useEffect,useRef } from 'react';
import ReactDataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css'; // Default styles
import './ReactGrid.css';
import debounce from 'lodash.debounce';

const ReactGrid = ({ columns, RowData }) => {
    const gridRef = useRef(null);
    useEffect(() => {
        const handleResize = debounce(() => {
            if (gridRef.current) {
                // Adjusting the grid ref without forceUpdate
                gridRef.current.style.width = '100%';
                gridRef.current.style.height = 'auto';
            }
        }, 100);

        const currentGridRef = gridRef.current;
        const resizeObserver = new ResizeObserver(handleResize);
        if (currentGridRef) {
            resizeObserver.observe(currentGridRef);
        }

        return () => {
            if (currentGridRef) {
                resizeObserver.unobserve(currentGridRef);
            }
            resizeObserver.disconnect();
        };
    }, []);

  
    const adjustedColumns = columns?.length > 0 ? columns?.map(col => ({
        ...col,
        key: col.key,
        flex: 1, // Allow column to grow and shrink with available space
        minWidth: 120, // Minimum width to prevent columns from becoming too small
        minHeight:180,
        renderCell: col.renderCell ? col.renderCell : (params) => (
            params.row[col.key] ?? params.row[col.key]  
        ),
      
    })) : [];

    return (
        <div ref={gridRef} style={{ height: 'auto', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ReactDataGrid
                rowKeyGetter={(row) => row.id}
                columns={adjustedColumns}
                rows={RowData}
                defaultColumnOptions={{
                    sortable: true,
                    resizable: true,
                    editable: true
                }}
            />
            {RowData.length === 0 && (
                <div className="ReactGridFoot">
                    <span>No data to display</span>
                </div>
            )}
        </div>
    );
};

export default ReactGrid;
