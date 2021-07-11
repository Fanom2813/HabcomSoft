export class FeedViewer extends Element {


    constructor(props) {
        super()
        this.props = props
        this.feed = globalThis.selectedFeed

    }

    componentDidMount() {
    }

    render() {
        return <main styleset="../styles/styles.css#feedPage">
           <div id="toolbar">
               <button class="flat icon" id="back">
                   <icon class="back" />
               </button>
           </div>
           <div id="contentWrapper">
               <div id="meta">
                    <picture id="mainImage" src={this.feed.image} />
                    <div id="feedFooter">
                        <p>
                            <i>Author</i>
                            {this.feed.author}
                        </p>
                        <p>
                            <i>Date</i>
                            {new Date(this.feed.createdAt).toLocaleDateString('en-GB')}
                        </p>
                    </div>
               </div>
               
               <div id="feedContentContainer">
                    <h1>{this.feed.title}</h1>
                    <div state-html={this.feed.content}></div>
               </div>
           </div>
      </main>;
    }

    ["on click at #back"](evt, btn){
        this.dispatchEvent(new Event("navigateto", {bubbles:true, data:{routeName:"index", params: null}}), true);
    }

}
