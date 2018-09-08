let INDEX = 0

export function diff(oldTree, newTree) {
    let patches = {}
    let index = 0
    walk(oldTree, newTree, index, patches)
    return patches
}

function diffAttr(newAttrs, oldAttrs) {
    let patch = {}
    for (let key in oldAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            patch[key] = newAttrs[key]
        }
    }

    for (let key in newAttrs) {
        if (!newAttrs.hasOwnProperty(key)) {
            patch[key] = newAttrs[key]
        }
    }
    return patch
}


function walk(oldNode, newNode, index, patches) {
    console.log("newNode",newNode)
    console.log("oldNode",oldNode)
    let currentPatch = []
    if(!newNode){
        currentPatch.push({type:"REMOVE"},index)
    }else if (isString(newNode) && isString(oldNode)) {
        if (oldNode !== newNode) {
            currentPatch.push({
                type: "TEXT",
                text: newNode
            })
        }
    } else if(oldNode.type === newNode.type){
        let attrs = diffAttr(oldNode.props,newNode.props)
        if (Object.keys(attrs).length > 0) {
            currentPatch.push({
                type: "ATTRS"
            }, attrs)
        } 
        if(oldNode.children && newNode.children){
            diffChildren(oldNode.children, newNode.children, patches)
        }
    }else {
        currentPatch.push({
            type: "REPLACE"
        }, newNode)
    }
    
    if (currentPatch.length > 0) {
        patches[index] = currentPatch
    }

}

function diffChildren(oldChildren, newChildren,patches) {
    console.log(oldChildren,newChildren)
    oldChildren.forEach((child, idx) => {
        walk(child, newChildren[idx], INDEX++, patches)
    });

}

function isString(node) {

    Object.prototype.toString.call(node) === "[object String]"
}