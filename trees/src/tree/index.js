import "./index.css";
import AnimalTreeData2 from "./data.json";
import AnimalTreeData from "./_data.json";

import { useState } from "react";

export default function AnimalTree() {
  console.log()
  return (
    <Tree>
      <AnimalNodes animal={animalDataToAnimal(AnimalTreeData2)}></AnimalNodes>
    </Tree>
  );
}

function AnimalNodes({ animal, depth = 0, onDelete: propOnDelete }) {
  const isRoot = depth === 0;
  const name = `${animal.name[0]}${'.'.repeat(depth)}${animal.name.slice(1)}`

  const [children, setChildren] = useState(animal.children);

  const onSubmit = (ev) => {
    console.log(ev);
    if (ev.key !== "Enter") {
      return;
    }

    const animalName = ev.target.value;
    setChildren((currState = []) => {
      const newState = [...currState];
      newState.push({
        name: animalName,
      });
      return newState;
    });
  };

  const onDelete = (animalToDelete) => {
    setChildren((currState = []) => {
      const newState = [...currState]
      const index = currState.findIndex((value) => value === animalToDelete)
      newState.splice(index, 1)
      return newState
    })
  }

  return (
    <TreeNode isRoot={isRoot}>
      <div>
        <span>{name}</span>
        <input type="text" onKeyUp={onSubmit} />
        {!isRoot ? <button onClick={() => propOnDelete?.(animal)}>delete</button> : null}
      </div>
      {children?.length
        ? children.map((child) => (
            <AnimalNodes
              animal={child}
              key={child.name}
              depth={depth + 1}
              onDelete={onDelete}
            ></AnimalNodes>
          ))
        : null}
    </TreeNode>
  );
}

const PADDING_VALUE = 2;
function TreeNode({ isRoot, children }) {
  return (
    <div
      className="node"
      style={{ paddingLeft: !isRoot ? `${PADDING_VALUE}rem` : 0 }}
    >
      {children}
    </div>
  );
}

function Tree({ children }) {
  return <div className="tree">{children}</div>;
}

function animalDataToAnimal(data) {
  const root = data.find(ad => ad.isRoot)
  if (!root.children) {
    return root
  }

  for (const item of data) {
    item.children = getInflatedChildren(item, data)
  }

  return root
}

function getInflatedChildren(item, dataList) {
  return item.children?.map(child => dataList.find(dl => dl.id === child)) ?? []
}