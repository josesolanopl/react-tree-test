import "./index.css";

export default function AnimalTree() {
  return (
    <Tree>
      <TreeNode isRoot>
        <span>mammals</span>
        <TreeNode>
          <span>cheetah</span>
        </TreeNode>
        <TreeNode>
          <span>bear</span>
          <TreeNode>
            <span>lion</span>
          </TreeNode>
          <TreeNode>
            <span>dog</span>
            <TreeNode>
              <span>elephant</span>
            </TreeNode>
          </TreeNode>
        </TreeNode>
        <TreeNode>
          <span>ape</span>
        </TreeNode>
      </TreeNode>
    </Tree>
  );
}

const PADDING_VALUE = 2;
function TreeNode({ isRoot, children }) {
    return <div class="node" style={{paddingLeft: !isRoot ? `${PADDING_VALUE}rem` : 0}}>{children}</div>
}

function Tree({ children }) {
  return <div className="tree">{children}</div>;
}
