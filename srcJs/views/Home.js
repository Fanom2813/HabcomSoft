import EmptyView from "./EmptyView.js";
import {FireStoreParser} from '../lib/FireStoreParser.js'
// Initialize Cloud Firestore through Firebase

export class Home extends Element {

  tags = ["News","Application","Services", "Achievments"]

  constructor() {
    super();

    this.feeds = []
    this.isLoading = true
    this.isError = false
    this.currentTag = "News"
    this.currentPage = 0

    this.emptyViewMessage = "Loading"
    this.emptyViewImage = "66400-worm-loading.json"
  }

  

  async componentDidMount() {
    try {
      var res = await fetch('https://habcomsoft.herokuapp.com/feeds/' + this.currentPage);
      
      console.log("try catch block");
      var theList = await res.json()
      this.componentUpdate({feeds: theList, isLoading : false})
    
    } catch (error) {
      console.log("error catch block");
      this.componentUpdate({isError:true, isLoading : false, emptyViewMessage : "Could not reach the server check your internet connection and try again.", emptyViewImage : "14918-connection-data.json"})
    }
  }

  // this.isLoading ? <EmptyView lottieFile="66400-worm-loading.json" display="Loading ..."/> :

  render() {
    return <main styleset="../styles/styles.css#home">
      {this.isLoading ? <EmptyView display={this.emptyViewMessage} lottieFile={this.emptyViewImage} /> : <EmptyView display="error!" lottieFile={this.emptyViewImage} />}
     <ul class="tag-wrapper">
     { 
      this.tags.map((tag) => <li  key={tag} class={` tag-item ${this.currentTag === tag ? "active" : ""}`}>#{tag}</li>) 
      
     }
     </ul>

     <ul#feedContainer>
        { 
          this.feeds.map((feed, index) => 
            
            <li.feedPreview key={index}>
            <h4>{feed.title}</h4>
            <picture src={feed.image} />
            
            <div>
              <p#author>{feed.author}</p>  
              <p#date>{new Date(feed.createdAt).toLocaleDateString('en-GB').split(' ').join('-')}</p>
            </div>
            </li>

          ) 
        }
     </ul>
    </main>;
      
  }



  async ["on click at li.tag-item"](evt, li) {
    this.componentUpdate({currentTag : li.innerHTML.substr(1)})
  }

  ["on feedRecieved"](evt, el) {
    console.log("Feedrecived");
  }

  async ["on click at li.feedPreview"](evt, li) {
    // console.log("click : " + li.getAttribute("key"));
    var feed_id = li.getAttribute("key")
    globalThis.selectedFeed = this.feeds[feed_id]
    this.dispatchEvent(new Event("navigateto", {bubbles:true, data:{routeName:"feed_viewer", params: feed_id}}), true);
  }

}

