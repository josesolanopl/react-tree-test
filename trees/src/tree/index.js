import "./index.css";
import AnimalTreeData from "./data.json";

export default function AnimalTree() {
  return <Tree>{buildAnimalNodes(AnimalTreeData, true)}</Tree>;
}

function buildAnimalNodes({ name, children }, isRoot) {
  return (
    <TreeNode isRoot={isRoot}>
      <span>{name}</span>
      {children?.length ? children.map(child => buildAnimalNodes(child)) : null}
    </TreeNode>
  );
}

const PADDING_VALUE = 2;
function TreeNode({ isRoot, children }) {
  return (
    <div
      class="node"
      style={{ paddingLeft: !isRoot ? `${PADDING_VALUE}rem` : 0 }}
    >
      {children}
    </div>
  );
}

function Tree({ children }) {
  return <div className="tree">{children}</div>;
}
