// ==========================================================================
// Cake Builder Application State Management & Computation Logic Engine
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // Core state tracking configuration object
    const cakeConfiguration = {
        size: { name: "1-Tier Petite", price: 45 },
        flavor: { name: "Belgian Dark Chocolate", price: 0 },
        style: { name: "Minimalist Naked Style", price: 0 }
    };

    // DOM Element target binding maps
    const optionCards = document.querySelectorAll(".option-card");
    const summarySize = document.getElementById("summary-size");
    const summaryFlavor = document.getElementById("summary-flavor");
    const summaryStyle = document.getElementById("summary-style");
    const totalDisplay = document.getElementById("builder-total-price");
    const submitBtn = document.getElementById("book-custom-cake-btn");

    // Click handler tracking cycle loops 
    optionCards.forEach(card => {
        card.addEventListener("click", () => {
            const type = card.getAttribute("data-type");
            const value = card.getAttribute("data-value");
            const price = parseFloat(card.getAttribute("data-price"));

            // 1. Clear out active styling across siblings inside this step container block only
            const parentBlock = card.closest(".options-grid");
            parentBlock.querySelectorAll(".option-card").forEach(c => c.classList.remove("active"));

            // 2. Assign selected active indicator class stylings onto this current target card node
            card.classList.add("active");

            // 3. Mutate the layout tracking configuration object variables state data
            cakeConfiguration[type].name = value;
            cakeConfiguration[type].price = price;

            // 4. Fire computational layout updates onto summary panels
            updateBuilderSummary();
        });
    });

    // Compute prices and push localized modifications down into receipt DOM text trees
    function updateBuilderSummary() {
        // Calculate current accumulated total prices
        const totalPrice = cakeConfiguration.size.price + cakeConfiguration.flavor.price + cakeConfiguration.style.price;

        // Push values down into typography text strings
        summarySize.textContent = cakeConfiguration.size.name;
        summaryFlavor.textContent = cakeConfiguration.flavor.name;
        summaryStyle.textContent = cakeConfiguration.style.name;

        // Animate price updates beautifully using clean text node injections
        totalDisplay.textContent = `€${totalPrice.toFixed(2)}`;
    }

    // Capture selections and transition intent into interaction loops 
    submitBtn.addEventListener("click", () => {
        const finalPrice = cakeConfiguration.size.price + cakeConfiguration.flavor.price + cakeConfiguration.style.price;
        
        alert(`🎉 Awesome Selection!\n\nYou configured a custom [${cakeConfiguration.size.name}] cake using a delicious [${cakeConfiguration.flavor.name}] flavor profile styled in an elegant [${cakeConfiguration.style.name}] finish.\n\nTotal Estimated Blueprint Setup: €${finalPrice}.00\n\nRedirecting your blueprint options package straight to consultation desks!`);
        
        // This is where you would forward selection variables arrays seamlessly to your contact.html page routes
        window.location.href = `contact.html?origin=builder&size=${encodeURIComponent(cakeConfiguration.size.name)}&flavor=${encodeURIComponent(cakeConfiguration.flavor.name)}&style=${encodeURIComponent(cakeConfiguration.style.name)}&total=${finalPrice}`;
    });
});

// ==========================================================================
// Master Live Dynamic Filtering Engine (Handles Products & Testimonials)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // 1. Shift active state design style to the clicked button pill
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // 2. Read the requested metadata key value
            const selectedFilter = button.getAttribute("data-filter");

            // 3. TARGET TESTIMONIAL CARDS (If they exist on this page)
            const testimonialCards = document.querySelectorAll(".testimonial-card");
            testimonialCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");
                if (selectedFilter === "all" || cardCategory === selectedFilter) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });

            // 4. TARGET MENU PRODUCT CARDS (If they exist on this page)
            // This maps your filter categories directly to the menu headings/grids
            const categories = document.querySelectorAll("main .category-title, main .product-grid");
            
            if (categories.length > 0) {
                if (selectedFilter === "all") {
                    // Show all titles and all product grids
                    categories.forEach(el => el.style.display = "");
                } else {
                    // Hide everything first, then selectively reveal matches
                    categories.forEach(el => el.style.display = "none");
                    
                    // Find and display the exact category title matches
                    const matchingTitles = document.querySelectorAll(`[data-menu-category="${selectedFilter}"]`);
                    matchingTitles.forEach(title => {
                        title.style.display = "";
                        // Automatically show the product grid sitting directly next to this title
                        if (title.nextElementSibling && title.nextElementSibling.classList.contains("product-grid")) {
                            title.nextElementSibling.style.display = "grid";
                        }
                    });
                }
            }
        });
    });
});