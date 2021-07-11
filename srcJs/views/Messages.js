import EmptyView from "./EmptyView.js";
export class Messages extends Element {

    data = [];

    constructor() {
        super();
    }

    componentDidMount() {

    }

    render() {
        return <main>
            <EmptyView display="No Message yet !" lottieFile="8604-message-loading.json" />
      </main>;
    }

}
