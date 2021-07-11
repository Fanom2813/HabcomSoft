export class PostEditorWindow extends Window {

    constructor(content/*vnode*/) {
       
      const width = (content[1]["window-width"] || 800) * devicePixelRatio;
      const height = (content[1]["window-height"] || 700) * devicePixelRatio;
  
      let params = { 
        url: __DIR__ + "posteditor.htm",
        type: Window.CHILD_WINDOW,
        width : width,
        height : height,
        alignment: 5,
        parameters: content
      };
      super(params);
    }
  
  }