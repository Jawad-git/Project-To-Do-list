let commonBuilders = (function() {
    let DivBuilder = (attribute, value) => 
        {
            let div = document.createElement("div");
            div.setAttribute(attribute, value);
            return div;
        }
    let TextBuilder = (type, content, className) => 
        {
            let heading = document.createElement(type);
            heading.textContent = content;
            if (className)
            {
                heading.className = className;
            }
            return heading;
        }
    let ImageBuilder = (src, alt, imgClass = "servingImage") =>
        {
            let img = document.createElement('img');
            img.src = src;
            img.alt = alt;
            img.className = imgClass;
            return img;
        }
        return {DivBuilder, TextBuilder, ImageBuilder};
    })();
export default commonBuilders;