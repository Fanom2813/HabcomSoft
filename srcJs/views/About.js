import * as sys from "@sys";
import {encode,decode} from "@sciter";
           
export class About extends Element {


    constructor() {
        super();

        this.members = []
    }

    async componentDidMount() {
        // var buffer;
        // buffer = await sys.dir.readfile("this://app/views/Home.js", "r");
        // var data = decode(buffer, 'utf-8')

        // var json = JSON.parse(data)

        // this.componentUpdate({members : json})
        var t = document.url("extra/members.json");
        fetch(t)
        .then(response =>  JSON.parse(response.text()))
        .then(d => this.componentUpdate({members : d}))

        // console.log()
    }

    render() {
        return <main styleset="../styles/styles.css#aboutPage">
             <div id="toolbar">
               <button class="flat icon" id="back">
                   <icon class="back" />
               </button>

               <p class="ml-1">Our Team</p>
           </div>
            
            <ul id="member-wrapper">
                { 
                    this.members.map((member) => 

                    <li>
                        <img src={member.profile} />
                        <div>
                            <h4>{member.fullname}</h4>
                            <h4>{member.position}</h4>
                            
                            <div id="socialMedia">
                                <button class="flat icon"  id="back">
                                    <icon class="email" />
                                </button>
                                <button class="flat icon" id="back">
                                    <icon class="whatsapp" />
                                </button>
                                <button class="flat icon" id="back">
                                    <icon class="facebook" />
                                </button>
                            </div>
                        </div>
                    </li>
                    
                    ) 
                }
            </ul>
      </main>;
    }

    ["on error at picture"](evt, el){
        console.log("Could not load image!");
    }

}
