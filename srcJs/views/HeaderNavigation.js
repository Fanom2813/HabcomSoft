import {PostEditorWindow} from "PostEditorWindow/posteditor.js";
import {PostEditorContent} from "PostEditorContent.js";


export class HeaderNavigation extends Element {
 
constructor(props) {
    super()

    this.props = props
    this.currentPage = "home"

    // console.log(URL.toPath(document.url("images/ic_launcher.png")));
}


render() {
return <div role="window-caption" class={` ${ this.props.windowFrameOnly === "true" ? "windowFrameOnly" : ""} `} id="header" styleset="../styles/styles.css#NavBar" >
    <picture id="ic_launcher" width="30" src={URL.toPath(document.url("images/ic_launcher.png"))} />

    <div .shadow1 id="search-bar">
    <icon icon.search .vertical-middle />
    <input|text tabindex="-1" .mr-5 #search style="width: *;" .vertical-middle placeholder="Search here " />
    </div>

    <button #home  href="route:index" class={` ${ this.currentPage === "home" ? "active" : ""} flat vertical-middle`}>
        <icon icon.home />
        Home
    </button>

    <button class={` ${ this.currentPage === "messages" ? "active" : ""} flat vertical-middle`} #messages href="route:messages">
        <icon icon.message />
        Messages
    </button>
    <button class={` ${ this.currentPage === "services" ? "active" : ""} flat vertical-middle`} #services href="route:services">
        <icon icon.stack />
        Services
    </button>
    <button#team class={` ${ this.currentPage === "team" ? "active" : ""} flat vertical-middle`} href="route:about">
        <icon icon.team />
        Team
    </button>

    <button|menu .vertical-middle .flat #settingsButton>
        <icon style="margin-bottom: 7dip;" icon.settings />
        Settings
        <menu.popup .shadow1>
            <li #newPost> <icon icon.add /> New Post</li>
            <li> <icon icon.security /> Sign In</li>
            <li> <icon icon.download /> Update</li>
        </menu>
    </button>

    <window-buttons>
        <window-button role="window-minimize"></window-button>
        <window-button role="window-maximize"></window-button>
        <window-button role="window-close"></window-button>
    </window-buttons>


            
</div>;
}

["on click at button.flat"](evt, button) {
    // console.log(button.id);
    
    this.componentUpdate({currentPage : button.id});
    // console.log(button.classList.entries());
}

["on click at li#newPost "](evt, button) {
    let wnd = new PostEditorWindow(<PostEditorContent/>);
}


}