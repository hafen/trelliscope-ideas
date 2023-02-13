import ColumnsMenu from '../subheader/ColumnsMenu';
import SortMenu from '../subheader/SortMenu';
import ExploreMenu from './ExploreMenu';
import LabelsMenu from './LabelsMenu';
import { useLayoutContext } from '../../contexts/layoutContext';

export default function Subheader({
  metas,
  columns,
  setColumns,
  tot,
  extraWidth,
}) {
  const { layout } = useLayoutContext();
  return (
    <div
      style={{
        width: `calc(100vw - ${extraWidth}px)`,
        display: 'flex',
        flexDirection: 'row',
        borderBottom: '1px solid #bbbbbb',
        // background: '#42a5f5aa',
        background: '#dedede',
        // color: '#FFFFFF',
        // background: '#212B36dd',
        paddingTop: 7,
        // paddingLeft: 20,
        paddingRight: 20,
        height: 47,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <ExploreMenu />
        <SortMenu metas={metas} />
        {layout === 'grid' && (
          <ColumnsMenu columns={columns} setColumns={setColumns} />
        )}
        <LabelsMenu />
      </div>
      <div>
        <div
          style={{ lineHeight: '35px', fontWeight: 500, paddingRight: 40 }}
        >{`**—** of ${tot} panels `}</div>
      </div>
    </div>
  );
}
