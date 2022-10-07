import "./index.css";
import AnimalTreeData from "./data.json";

import { useState } from 'react'

export default function AnimalTree() {
  return <Tree><AnimalNodes animal={AnimalTreeData} isRoot></AnimalNodes></Tree>;
}

function AnimalNodes({animal, isRoot}) {
  const { name } = animal
  const [children, setChildren] = useState(animal.children)

  const onSubmit = (ev) => {
    console.log(ev)
    if (ev.key !== 'Enter') {
      return
    }

    const animalName = ev.target.value
    setChildren((currState = []) => {
      const newState = [...currState]
      newState.push({
        name: animalName
      })
      return newState
    })
  }

  return (
    <TreeNode isRoot={isRoot}>
      <div>
        <span>{name}</span>
        <input type="text" onKeyUp={onSubmit} />
      </div>
      {children?.length ? children.map(child => <AnimalNodes animal={child} key={child.name}></AnimalNodes>) : null}
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
