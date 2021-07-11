class EmptyView extends Element {

    constructor(props) {
        super();
        this.props = props;
    }
    componentDidMount() {

    }

    render() {
        return <div styleset="../styles/styles.css#emptyview">
            <lottie loop autoplay src={"./lotties/" + this.props.lottieFile} />
            <h4>{this.props.display}</h4>
      </div>;
    }

}

export default EmptyView;