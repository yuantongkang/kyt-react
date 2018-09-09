import { render } from "./element";
let index= 0
let allPatches
export function patch(node,patches) {
    allPatches = patches
    walk(node)
}
function walk(node){
    let currentPatch = allPatches[index++]
    let  childNodes = node.childNodes
    childNodes.forEach(child => {
        walk(child)
    });
    if(currentPatch){
        doPatch(node,currentPatch)
    }
}
function doPatch(node,patches){
    patches.forEach(patch=>{
        switch (patch.type){
            case "TEXT":
                node.textContent = patch.text
            break
            case "REPLACE":
                let newNode = (patch.newNode instanceof Element)?render(patch.newNode):document.createTextNode(patch)
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
function setAttr(node,key,value){
    switch(key){
        case 'value':
        if(node.tagName === 'input'){
            node.value = value
        }else{
            node.setAttribute(key,value)
        }
        break
        case 'style':
            node.style.cssText = value
        break
        default:
            node.setAttribute(key,value)
    }
}