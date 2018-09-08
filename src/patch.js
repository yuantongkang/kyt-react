import { render } from "./element";

let allPatches
function patch(node,patches) {
    allPatches = patches
    let index= 0
    walk(node)
}
function walk(){
    let currentPatch = patches[index++]
    let  childNodes = node.childNodes
    childNodes.forEach(child => {
        walk(child)
    });
    if(currentPatch.patch>0){}
}
function doPatch(node,patches){
    patches.forEach(patch=>{
        switch (patch.type){
            case "TEXT":
                node.textContent = patch.text
            break
            case "REPLACE":
                let newNode = (patches.newNode instanceof Element)?render(patches.newNode):document.createTextNode(patches)
                node.parentNode.replaceChild(newNode,node)
            break
            case "REMOVE":
                node.parentNode.removeChild(node)
            break
            case "ATTRS":
                for(let key in patch.attrs){
                    let value = patch.attrs[key]
                    if(value){
                        setAttr(node,key,value)
                    }else{
                        node.removeAttribute(key)
                    }
                }
            break
        }
    })
}