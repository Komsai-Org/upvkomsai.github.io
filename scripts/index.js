/**
 * Predefined constants for different Card layouts
 */
const CARD = {
    HORIZONTAL: "card-h",
    VERTICAL: "card-v",
    SMALL: "card-sm",
};

/**
 * @param {string} layout - card layout as defined in the CARD constant (horizontal, vertical, or small)
 * @param {boolean} includeModal - bind a modal to the Card item to show more details
 * @param {string} imgPath - path to image file to be displayed on the card
 * @param {string} title - title of the card
 * @param {string} subtitle - subtitle to be displayed on the card
 * @param {string} description
 * @param {boolean} showDescription - whether to show description on the card itself
 * @param {string} url - URL pointing to external resources
 * @param {string} urlText - text to display instead of the URL
 * @returns {Node} A preformatted `<div>` element that can be attached to the DOM
 */
function bindToCard(
    layout,
    includeModal,
    imgPath,
    title,
    subtitle,
    description,
    showDescription,
    url,
    urlText = "More details"
) {
    layout = layout || CARD.HORIZONTAL; // Default card layout is horizontal

    var clone = document
        .querySelector(`#templates .card.${layout}.template`)
        .cloneNode(true);

    if (imgPath) {
        var img = document.createElement("img");
        img.src = imgPath;
        img.alt = title || "No description provided.";
        clone.querySelector(`.${layout}-img`).appendChild(img);
    }

    if (title) {
        clone.querySelector(`.${layout}-content .${layout}-title`).textContent =
            title;
    }

    if (subtitle) {
        clone.querySelector(
            `.${layout}-content .${layout}-subtitle`
        ).textContent = subtitle;
    }

    if (description && showDescription) {
        clone.querySelector(
            `.${layout}-content .${layout}-description`
        ).textContent = description;
    } else {
        clone
            .querySelector(`.${layout}-content .${layout}-description`)
            ?.remove();
    }

    if (url) {
        var link = document.createElement("a");

        link.href = url;
        link.textContent = urlText;

        clone.querySelector(`.${layout}-content`).appendChild(link);
    }

    clone.classList.remove("template");

    if (includeModal) {
        bindToModal(clone, title, subtitle, description);
        clone.classList.add("clickable", null);
    }

    return clone;
}

/**
 * Modal
 */
var modal = document.getElementById("modal");

var modalClose = modal.querySelector(".modal-header .modal-close");
modalClose.classList.add("clickable");
modalClose.addEventListener("click", () => (modal.hidden = true));

modal.addEventListener("click", function (e) {
    if (e.target !== modal) {
        return;
    } else {
        modal.hidden = true;
    }
});

/**
 * @param {Node} element - element that triggers the modal
 * @param {string} title
 * @param {string} subtitle
 * @param {string} description
 */
function bindToModal(element, title, subtitle, description) {
    if (!element) return false;

    element.addEventListener("click", function (e) {
        if (e.target === element.querySelector("a")) {
            return;
        }

        modal.querySelector(".modal-header .modal-title").textContent =
            title || "No title";
        modal.querySelector(".modal-content .modal-subtitle").textContent =
            subtitle || "N/A";
        modal.querySelector(".modal-content .modal-description").textContent =
            description || "No description";
        modal.hidden = false;
    });
}

/**
 * Binds the data to each subsection
 */
function bindData() {
    const _news = document.querySelector("#news .section-content");
    const _projectsDone = document.querySelector(
        "#projects-done .section-content"
    );

    // Clone the template `div` and populate it with necessary data

    if (news.length) {
        _news.querySelector(".nodata").remove();

        news.forEach(function (e) {
            var card = bindToCard(
                CARD.VERTICAL,
                true,
                e.img_path,
                e.title,
                e.date,
                e.content,
                true
            );

            _news.append(card);
        });
    }

    if (projectsDone.length) {
        _projectsDone.querySelector(".nodata").remove();

        projectsDone.forEach(function (e) {
            var card = bindToCard(
                CARD.VERTICAL,
                true,
                e.img_path,
                e.name,
                `${e.date_started} - ${e.date_completed || "Present"}`,
                e.description,
                true,
                e.url,
                e.urlText || "Project link"
            );
            _projectsDone.append(card);
        });
    }

    document.querySelector("#templates").remove();
}

bindData();

// Handles button clicks on header navigation
var details_btn = document.getElementById("details-btn");
var about_btn = document.getElementById("about-btn");
var return_btn = document.getElementById("return-btn");

about_btn.addEventListener("click", function (e) {
    document.querySelectorAll("body > div").forEach(function (element) {
        if (element.id === "about") {
            element.removeAttribute("hidden");
        } else {
            element.setAttribute("hidden", null);
        }
    });

    return_btn.hidden = false;
    details_btn.remove();
    about_btn.remove();
});
