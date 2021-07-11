import { HeaderNavigation } from "HeaderNavigation.js";
import * as sys from "@sys";
import * as sciter from "@sciter";

export class PostEditorContent extends Element {

    constructor(){
        super()
        this.imageLink = "Select Image"
        this.thePost = {}
        this.feedFormDetails
    }

    render() {
        return <main styleset={`${URL.toPath(document.url("styles/styles.css"))}#postEditor`}>
            <HeaderNavigation windowFrameOnly="true" />
            <div class="toolbar">
            <h3>Post Editor</h3>
            <button class="flat icon" id="send">
                   <icon class="send" />
               </button>
            </div>
            
            <form id="uploadImageForm">
                <p>Upload Image</p>
                <div  class="shadow1 active">
                    <p>{this.imageLink}</p>
                    <button class="flat icon" id="loadImage">
                        <icon class="folder" />
                        Select Image
                    </button>
                </div>
            </form>

            <form id="postDetails">
                <input placeholder="Author" name="author"/>
                <input placeholder="Title"  name="title"/>
                <input placeholder="Categories separate with ,"  name="categoryName"/>
                <htmlarea.content name="content">Content Goes Here ...</htmlarea>
            </form>
            
        </main>
    }

    async uploadImage(imageUrl){
        var buffer = sys.fs.$readfile(imageUrl, "r");
        let base64 = sciter.toBase64(buffer);
        const body = {"image" : base64}

        fetch("https://api.imgbb.com/1/upload?key=8c8a411bd48703851d14ac760a35a4a9", {
            body,
            method: "POST"
        })
        .then(response => response.json())
        .then(json => this.componentUpdate({imageLink : json.data.url}))
    }

    ["on click at button#close-by-code"]() {
        this.parentWindow.close("by-code"); // NOTE: "by-code" will go to window.closeData
    }

    ["on click at button#loadImage"]() {
        var i = Window.this.selectFile {
            filter: "Image Files|*.png;*.jpeg;*.jpg;*.gif" ,
            mode: "open",
            caption: "Select an image file"
        };
        if (i) {
            this.uploadImage(URL.toPath(i))
            this.componentUpdate({imageLink : URL.toPath(i)})
        }
    }

    ["on pastehtml at .content"](evt, el){
        //this.componentUpdate({thePost : el.value})
        //console.log(this.thePost);  
    }

    ["on pastetext at .content"](evt, el){
        console.log("paste test");  
    }

    ["on change at form#postDetails"](evt, el){
        //Window.this.modal(<info>Post submitted successfully</info>)
        //console.log(JSON.stringify(el.value));
        this.feedFormDetails = el
        this.componentUpdate({thePost : el.value})
        //console.log(this.thePost);  
    }

    ["on click at #send"](evt, el){
        //Window.this.modal(<info>Post submitted successfully</info>)
        this.thePost["image"] = this.imageLink
        this.thePost["categoryId"] = 0

        fetch("https://habcomsoft.herokuapp.com/feed", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.thePost)
        })
        .then(response => {
            if (response.status == 201) {

                Window.this.modal(<info>Post submitted successfully</info>)
            }else{
                //this.feedFormDetails.value = {"author":"", "title":"", "content":"", "categoryName":""}
                Window.this.modal(<error>Post submitted successfully</error>)
            }
            
        })
        
    }
}