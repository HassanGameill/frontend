import React from 'react'
import {ReactNode} from 'react'
import {TCategory} from '../../../Types/category'
import {LottieHandler} from '../../Feedback/index'


type GridListProps<T> = {
  records: T[];
  renderItem: (itemData: T) => ReactNode;
  emptyMessage?: string;
};

type HasId = {id?: number}

const GridList = <T extends HasId>({records, renderItem, emptyMessage}: GridListProps<T>) => {
  
  
  const renderList =
    records.length >= 1
      ? records.map((itemData) => (
          <div key={itemData.id}>
           {renderItem(itemData)}
          </div>
        ))
      : <LottieHandler type="empty" message={emptyMessage} />;
      
      
  return (
    <div className="flex items-center justify-center " >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {renderList}
      </div>
    </div>
  )
};

export default GridList;