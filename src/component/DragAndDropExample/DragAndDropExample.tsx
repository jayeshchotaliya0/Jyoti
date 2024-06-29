import React, { useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css"; // Ensure this path is correct and the CSS file exists

const COLUMN_NAMES = {
  DO_IT: 'Do it',
  IN_PROGRESS: 'In Progress',
  AWAITING_REVIEW: 'Awaiting review',
  DONE: 'Done',
};

const tasks = [
  { id: 1, name: 'Item 1', column: COLUMN_NAMES.DO_IT },
  { id: 2, name: 'Item 2', column: COLUMN_NAMES.DO_IT },
  { id: 3, name: 'Item 3', column: COLUMN_NAMES.DO_IT },
  { id: 4, name: 'Item 4', column: COLUMN_NAMES.DO_IT },
];

const MovableItem = ({ name, index, currentColumnName, moveCardHandler, setItems }) => {
  const changeItemColumn = (currentItem, columnName) => {
    setItems((prevState) => {
      return prevState.map((e) => ({
        ...e,
        column: e.name === currentItem.name ? columnName : e.column,
      }));
    });
  };

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "Our first type",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCardHandler(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: "Our first type",
    item: { index, name, currentColumnName },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        const { name } = dropResult;
        switch (name) {
          case COLUMN_NAMES.IN_PROGRESS:
            changeItemColumn(item, COLUMN_NAMES.IN_PROGRESS);
            break;
          case COLUMN_NAMES.AWAITING_REVIEW:
            changeItemColumn(item, COLUMN_NAMES.AWAITING_REVIEW);
            break;
          case COLUMN_NAMES.DONE:
            changeItemColumn(item, COLUMN_NAMES.DONE);
            break;
          case COLUMN_NAMES.DO_IT:
            changeItemColumn(item, COLUMN_NAMES.DO_IT);
            break;
          default:
            break;
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} className="movable-item" style={{ opacity }}>
      {name}
    </div>
  );
};

const Column = ({ children, className, title }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "Our first type",
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (item) => {
      const { currentColumnName } = item;
      return (
        currentColumnName === title ||
        (currentColumnName === COLUMN_NAMES.DO_IT && title === COLUMN_NAMES.IN_PROGRESS) ||
        (currentColumnName === COLUMN_NAMES.IN_PROGRESS && (title === COLUMN_NAMES.DO_IT || title === COLUMN_NAMES.AWAITING_REVIEW)) ||
        (currentColumnName === COLUMN_NAMES.AWAITING_REVIEW && (title === COLUMN_NAMES.IN_PROGRESS || title === COLUMN_NAMES.DONE)) ||
        (currentColumnName === COLUMN_NAMES.DONE && title === COLUMN_NAMES.AWAITING_REVIEW)
      );
    }
  });

  const getBackgroundColor = () => {
    if (isOver) {
      if (canDrop) {
        return "rgb(188,251,255)";
      } else if (!canDrop) {
        return "rgb(255,188,188)";
      }
    } else {
      return "";
    }
  };

  return (
    <div ref={drop} className={className} style={{ backgroundColor: getBackgroundColor() }}>
      <p>{title}</p>
      {children}
    </div>
  );
};

const DragAndDropExample = () => {
  const [items, setItems] = useState(tasks);

  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];
    if (dragItem) {
      setItems((prevState) => {
        const copiedStateArray = [...prevState];
        const prevItem = copiedStateArray.splice(hoverIndex, 1, dragItem);
        copiedStateArray.splice(dragIndex, 1, prevItem[0]);
        return copiedStateArray;
      });
    }
  };

  const returnItemsForColumn = (columnName) => {
    return items
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <MovableItem
          key={item.id}
          name={item.name}
          currentColumnName={item.column}
          setItems={setItems}
          index={index}
          moveCardHandler={moveCardHandler}
        />
      ));
  };

  return (
    <div className="container">
      <DndProvider backend={HTML5Backend}>
        <Column title={COLUMN_NAMES.DO_IT} className="column do-it-column">
          {returnItemsForColumn(COLUMN_NAMES.DO_IT)}
        </Column>
        <Column title={COLUMN_NAMES.IN_PROGRESS} className="column in-progress-column">
          {returnItemsForColumn(COLUMN_NAMES.IN_PROGRESS)}
        </Column>
        <Column title={COLUMN_NAMES.AWAITING_REVIEW} className="column awaiting-review-column">
          {returnItemsForColumn(COLUMN_NAMES.AWAITING_REVIEW)}
        </Column>
        <Column title={COLUMN_NAMES.DONE} className="column done-column">
          {returnItemsForColumn(COLUMN_NAMES.DONE)}
        </Column>
      </DndProvider>
    </div>
  );
};

export default DragAndDropExample;
