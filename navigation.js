// Scroll shadow
const contentRight = document.querySelector('.content-right');

if (contentRight) {
    // Force show bottom shadow for testing
    contentRight.classList.add('has-more-content');

    contentRight.addEventListener('scroll', () => {
        console.log('scrollHeight:', contentRight.scrollHeight);
        console.log('scrollTop:', contentRight.scrollTop);
        console.log('clientHeight:', contentRight.clientHeight);
        console.log('Can scroll more?', contentRight.scrollHeight - contentRight.scrollTop > contentRight.clientHeight + 50);

        // Top shadow
        if (contentRight.scrollTop > 50) {
            contentRight.classList.add('scrolled');
        } else {
            contentRight.classList.remove('scrolled');
        }

        // Bottom shadow
        const isAtBottom = contentRight.scrollHeight - contentRight.scrollTop <= contentRight.clientHeight + 50;
        if (!isAtBottom) {
            contentRight.classList.add('has-more-content');
        } else {
            contentRight.classList.remove('has-more-content');
        }
    });
}

const pageContents = document.querySelectorAll('.page-content');

pageContents.forEach(pageContent => {
    pageContent.addEventListener('scroll', () => {
        if (pageContent.scrollTop > 50) {
            pageContent.classList.add('scrolled');
        } else {
            pageContent.classList.remove('scrolled');
        }

        const isAtBottom = pageContent.scrollHeight - pageContent.scrollTop <= pageContent.clientHeight + 50;
        if (!isAtBottom) {
            pageContent.classList.add('has-more-content');
        } else {
            pageContent.classList.remove('has-more-content');
        }
    });

    // Initial check for bottom shadow
    const isAtBottom = pageContent.scrollHeight - pageContent.scrollTop <= pageContent.clientHeight + 50;
    if (!isAtBottom) {
        pageContent.classList.add('has-more-content');
    }
});

// Tab Navigation
const tabs = document.querySelectorAll('.topic-tab');
const pages = document.querySelectorAll('.project-page');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const chapter = tab.getAttribute('data-chapter');
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show corresponding page
        pages.forEach(page => {
            if (page.getAttribute('data-chapter') === chapter) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });
        
        // Scroll to top of content
        document.querySelector('.project-container').scrollTop = 0;
    });
});

// Smooth Exit Animation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetUrl = link.getAttribute('href');

        const contentElements = document.querySelectorAll('.content, .content-right, .content-left');

        if (contentElements.length > 0) {
            contentElements.forEach(el => el.classList.add('exit'));

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500);
        } else {
            window.location.href = targetUrl;
        }
    });
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetUrl = link.getAttribute('href');

        document.body.classList.add('transitioning');
        const contentElements = document.querySelectorAll('.content, .content-right, .content-left');

        if (contentElements.length > 0) {
            contentElements.forEach(el => el.classList.add('exit'));

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500);
        } else {
            window.location.href = targetUrl;
        }
    });
});

// Tooltip functionality
const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');

tooltipTriggers.forEach(trigger => {
    const tooltipId = trigger.getAttribute('data-tooltip');
    const tooltipBox = document.getElementById(tooltipId);

    if (tooltipBox) {
        trigger.addEventListener('mouseenter', () => {
            tooltipBox.classList.add('active');
        });

        trigger.addEventListener('mouseleave', () => {
            tooltipBox.classList.remove('active');
        });
    }
});

// Ingredient Explorer Data
const ingredientData = {
    protein: {
        label: "Protein",
        description: "Each food group has their own hallmark effect. For proteins, every stack boosts the 'multiplier' for all inspiration the food would give for physical inspiration types, like Martial or Crafting.",
        subgroups: {
            egg: {
                label: "Egg",
                description: "Subgroups determine the inspiration delivery method. With eggs, it's banked delivery. It's usually a good idea to prepare an egg-based breakfast before the fighter's afternoon training!",
                types: {
                    chicken: {
                        label: "Chicken",
                        description: "Type typically handles inspiration gain/conversion amounts, and decides the associated flavors. Chicken eggs add a small amount of general inspiration, and converts it all equally between the physical types.",
                        forms: {
                            whole: {
                                label: "Whole",
                                description: "Form usually only matters for determining preferences, or valid recipes. Whole eggs are the unprocessed default, not much to think about there!"
                            },
                            cracked: {
                                label: "Cracked",
                                description: "You can crack an egg just by right clicking a whole egg and picking crack from a dropdown menu. If you boil a whole egg, you get a boiled egg. If you boil a cracked one, you get poached!"
                            }
                        }
                    },
                    duck: {
                        label: "Duck",
                        description: "identical inspiration gain to a chicken egg, but it offers a small boost if it's eventually used to create a baked dish. Basically, use it to make doughs!",
                        forms: {
                            whole: {
                                label: "Whole",
                                description: "Whole eggs are the unprocessed default, not much to think about there!"
                            },
                            cracked: {
                                label: "Cracked",
                                description: "A necessary form for some recipes. Boiling a whole egg results in a boiled egg, while using a cracked egg is necessary for poached!"
                            }
                        }
                    }
                }
            },
            meat: {
                label: "Meat",
                description: "Over-time delivery - provides the most total inspiration, doled out over several days. Always beneficial to keep active.",
                types: {
                    beef: {
                        label: "Beef",
                        description: "Standard meat, gives a small amount of General Inspiration and converts it all equally across physical inspiration types.",
                        forms: {
                            sirloin: {
                                label: "Sirloin",
                                description: "Sirloins provide an inspiration bonus if they're used in a pan-frying recipe!"
                            },
                            chuck: {
                                label: "Chuck",
                                description: "Chucks provide an inspiration bonus if they're used to make a burger!"
                            }
                        }
                    },
                    basilisk: {
                        label: "Basilisk",
                        description: "A higher tier meat obtained from hunts. Doesn't give any general inspiration, but converts a large chunk of excess general inspiration from other ingredients directly to martial inspiration. Great supplementary ingredient for the fighter!",
                        forms: {
                            sirloin: {
                                label: "Sirloin",
                                description: "Sirloins provide an inspiration bonus if they're used in a pan-frying recipe!"
                            },
                            chuck: {
                                label: "Chuck",
                                description: "Chucks provide an inspiration bonus if they're used to make a burger!"
                            }
                        }
                    }
                }
            }
        }
    },
    vegetable: {
        label: "Vegetable",
        description: "Each stack boosts mental inspiration types like Culinary or Medicinal.",
        subgroups: {
            starchy: {
                label: "Starchy",
                description: "Instant delivery - gives the inspiration immediately when eaten. Simple and reliable.",
                types: {
                    parsnip: {
                        label: "Parsnip",
                        description: "Provides a small amount of General inspiration and converts it all equally across mental inspiration types.",
                        forms: {
                            whole: {
                                label: "Whole",
                                description: "The unprocessed base, not much to it! Not every ingredient needs a variety of forms, so this is the only one for parsnips! Forms only need to exist if there's a meaningful preference, recipe interaction, or something unique."
                            }
                        }
                    },
                    peas: {
                        label: "Peas",
                        description: "Provides a modest amount of general inspiration, but no conversion into other types. Good for generalists like the bard or carpenter, or if you're making a dish with other ingredients that focus more on converting excess general inspiration into the type you want!",
                        forms: {
                            whole: {
                                label: "Whole",
                                description: "The unprocessed base, not much to it!"
                            },
                            mushy: {
                                label: "Mushy",
                                description: "Mushy peas are just marked as 'mushy'. Some characters love it, some hate it. There's an in-setting nation that usually likes them this way, so it's a good heuristic for knowing who might prefer it!"
                            }
                        }
                    }
                }
            },
            fungi: {
                label: "Fungi",
                description: "Fungi provide banked delivery. Fungi aren't the main vegetable subgroup for it though, 'hearty' vegetables have the highest capacity for banked delivery, and their ingredients usually provide more inspiration overall. To make up for this, the fungi subgroup has the unique quirk of additionally adding a protein modifier despite being a vegetable!",
                types: {
                    button: {
                        label: "Button Mushroom",
                        description: "Common mushroom. Provides a small amount of general inspiration. No conversion, you usually add it for the food group bonuses!",
                        forms: {
                            brown: {
                                label: "Brown",
                                description: "Button mushrooms are a rare case where the form has a small mechanical effect. Brown mushrooms have an extra 'savory' taste modifier."
                            },
                            white: {
                                label: "White",
                                description: "White mushrooms give a small bonus to general inspiration if they're used in a salad."
                            }
                        }
                    },
                    glowshroom: {
                        label: "Glowshroom",
                        description: "A rarer mushroom found from hunts. Provides a small amount of general inspiration, but is actually inedible! Well, mostly.",
                        forms: {
                            whole: {
                                label: "Whole",
                                description: "A whole glowshroom carries the 'inedible' modifier. Basically, trying to feed most characters a dish with this in it will cause them to reject it and get mad at you. Though it's always possible to introduce a monstrous character in the future that loves 'inedible' foods!"
                            },
                            powdered: {
                                label: "Powdered",
                                description: "Ground glowshrooms are safe to eat, and also count as an 'additive' ingredient. This means it's a seasoning you can apply to your dishes! You get the protein boost from the fungi subgroup, and it also adds a 'pretty' modifier that some characters have a preference for. Also, purely aesthetically, it adds a little sparkle effect to the dish sprite!"
                            }
                        }
                    }
                }
            }
        }
    }
};

// DOM Elements
const groupSelect = document.getElementById('food-group');
const subgroupSelect = document.getElementById('subgroup');
const typeSelect = document.getElementById('type');
const formSelect = document.getElementById('form');
const ingredientSprite = document.getElementById('ingredient-sprite');
const ingredientName = document.getElementById('ingredient-name');
const ingredientInfo = document.getElementById('ingredient-info');

// Populate a select element with options
function populateSelect(selectElement, options, valueKey = null) {
    selectElement.innerHTML = '';
    for (const [key, value] of Object.entries(options)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = value.label || value;
        selectElement.appendChild(option);
    }
}

// Update the display based on current selections
function updateDisplay() {
    const group = groupSelect.value;
    const subgroup = subgroupSelect.value;
    const type = typeSelect.value;
    const form = formSelect.value;

    const groupData = ingredientData[group];
    const subgroupData = groupData.subgroups[subgroup];
    const typeData = subgroupData.types[type];
    const formData = typeData.forms[form];

    // Update name
    if (group === 'protein' && subgroup === 'meat') {
        ingredientName.textContent = `${typeData.label} ${formData.label}`;
    } else if (group === 'protein' && subgroup === 'egg') {
        ingredientName.textContent = `${formData.label} ${typeData.label} Egg`;
    } else {
        ingredientName.textContent = `${formData.label} ${typeData.label}`;
    }

    // sprite path
    let extension = (type === 'glowshroom') ? 'gif' : 'png';
    ingredientSprite.src = `images/ingredients/${subgroup}-${type}-${form}.${extension}`;

    // info
    ingredientInfo.innerHTML = `
    <p><b><span class="drop-cap">G</span>roup — ${groupData.label}:</b> ${groupData.description}</p>
    <p><b><span class="drop-cap">S</span>ubgroup — ${subgroupData.label}:</b> ${subgroupData.description}</p>
    <p><b><span class="drop-cap">T</span>ype — ${typeData.label}:</b> ${typeData.description}</p>
    <p><b><span class="drop-cap">F</span>orm — ${formData.label}:</b> ${formData.description}</p>
`;

}

// when group changes, update subgroups
function onGroupChange() {
    const group = groupSelect.value;
    populateSelect(subgroupSelect, ingredientData[group].subgroups);
    onSubgroupChange();
}

// when subgroup changes, update types
function onSubgroupChange() {
    const group = groupSelect.value;
    const subgroup = subgroupSelect.value;
    populateSelect(typeSelect, ingredientData[group].subgroups[subgroup].types);
    onTypeChange();
}

// when type changes, update forms
function onTypeChange() {
    const group = groupSelect.value;
    const subgroup = subgroupSelect.value;
    const type = typeSelect.value;
    populateSelect(formSelect, ingredientData[group].subgroups[subgroup].types[type].forms);
    updateDisplay();
}

// listeners
groupSelect.addEventListener('change', onGroupChange);
subgroupSelect.addEventListener('change', onSubgroupChange);
typeSelect.addEventListener('change', onTypeChange);
formSelect.addEventListener('change', updateDisplay);

// Initialize
onGroupChange();

// MODIFIER EXPLORER

// Modifier Explorer Data
const modifierIngredientData = {
    protein: {
        label: "Protein",
        modifiers: [
            { id: "protein", stacks: 1 }
        ],
        subgroups: {
            egg: {
                label: "Egg",
                modifiers: [
                    { id: "bankedpool", stacks: 3 }
                ],
                types: {
                    chicken: {
                        label: "Chicken",
                        modifiers: [
                            { id: "protein", stacks: 1 },
                            { id: "banked", stacks: 1 },
                            { id: "Physical", stacks: 1 },
                            { id: "savory", stacks: 1 }
                        ],
                        forms: {
                            whole: {
                                label: "Whole",
                                modifiers: []
                            },
                            cracked: {
                                label: "Cracked",
                                modifiers: []
                            }
                        }
                    },
                    duck: {
                        label: "Duck",
                        modifiers: [
                            { id: "protein", stacks: 1 },
                            { id: "banked", stacks: 1 },
                            { id: "Physical", stacks: 1 },
                            { id: "savory", stacks: 1},
                            { id: "baking", stacks: 1 }
                        ],
                        forms: {
                            whole: {
                                label: "Whole",
                                modifiers: []
                            },
                            cracked: {
                                label: "Cracked",
                                modifiers: []
                            }
                        }
                    }
                }
            },
            meat: {
                label: "Meat",
                modifiers: [
                    { id: "overtimepool", stacks: 3 }
                ],
                types: {
                    beef: {
                        label: "Beef",
                        modifiers: [
                            { id: "protein", stacks: 2 },
                            { id: "overtime", stacks: 1 },
                            { id: "Physical", stacks: 2 },
                            { id: "savory", stacks: 2}
                        ],
                        forms: {
                            sirloin: {
                                label: "Sirloin",
                                modifiers: [
                                    { id: "frying", stacks: 1 }
                                ]
                            },
                            chuck: {
                                label: "Chuck",
                                modifiers: [
                                    { id: "burger", stacks: 1 }
                                ]
                            }
                        }
                    },
                    basilisk: {
                        label: "Basilisk",
                        modifiers: [
                            { id: "protein", stacks: 5 },
                            { id: "Martial", stacks: 5 },
                            { id: "savory", stacks: 2},
                            { id: "sweet", stacks: 1 }
                        ],
                        forms: {
                            sirloin: {
                                label: "Sirloin",
                                modifiers: [
                                    { id: "frying", stacks: 1 }
                                ]
                            },
                            chuck: {
                                label: "Chuck",
                                modifiers: [
                                    { id: "burger", stacks: 1 }
                                ]
                            }
                        }
                    }
                }
            }
        }
    },
    vegetable: {
        label: "Vegetable",
        modifiers: [
            { id: "vegetable", stacks: 1 }
        ],
        subgroups: {
            starchy: {
                label: "Starchy",
                modifiers: [
                    { id: "instantpool", stacks: 3 }
                ],
                types: {
                    parsnip: {
                        label: "Parsnip",
                        modifiers: [
                            { id: "vegetable", stacks: 1 },
                            { id: "instant", stacks: 1 },
                            { id: "Mental", stacks: 1 },
                            { id: "sweet", stacks: 1}
                        ],
                        forms: {
                            whole: {
                                label: "Whole",
                                modifiers: []
                            }
                        }
                    },
                    peas: {
                        label: "Peas",
                        modifiers: [
                            { id: "vegetable", stacks: 1 },
                            { id: "instant", stacks: 3 },
                            { id: "sweet", stacks: 1}
                        ],
                        forms: {
                            whole: {
                                label: "Whole",
                                modifiers: []
                            },
                            mushy: {
                                label: "Mushy",
                                modifiers: [
                                    { id: "mushy", stacks: 1 }
                                ]
                            }
                        }
                    }
                }
            },
            fungi: {
                label: "Fungi",
                modifiers: [
                    { id: "bankedpool", stacks: 1 },
                    { id: "protein", stacks: 1 }
                ],
                types: {
                    button: {
                        label: "Button Mushroom",
                        modifiers: [
                            {id: "banked", stacks: 1},
                            {id: "savory", stacks: 1}
                        ],
                        forms: {
                            brown: {
                                label: "Brown",
                                modifiers: [
                                    {id: "savory", stacks: 1}
                                ]
                            },
                            white: {
                                label: "White",
                                modifiers: [
                                    { id: "salad", stacks: 1}
                                ]
                            }
                        }
                    },
                    glowshroom: {
                        label: "Glowshroom",
                        modifiers: [
                            { id: "banked", stacks: 1},
                            { id: "savory", stacks: 1}
                        ],
                        forms: {
                            whole: {
                                label: "Whole",
                                modifiers: [
                                    { id: "inedible", stacks: 1 }
                                ]
                            },
                            powdered: {
                                label: "Powdered",
                                modifiers: [
                                    { id: "additive", stacks: 1 },
                                    { id: "pretty", stacks: 1 }
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
};

const modifierDefs = {
    protein: {
        name: "Protein",
        tier: "core",
        icon: "protein",
        baseValue: 0.25,
        description: "Increases multiplier for physical inspiration types by x{{value}}."
    },
    vegetable: {
        name: "Vegetable",
        tier: "core",
        icon: "vegetable",
        baseValue: 0.25,
        description: "Increases multiplier for mental inspiration types by x{{value}}."
    },
    bankedpool: {
        name: "Banked Delivery",
        tier: "core",
        icon: "banked delivery",
        baseValue: 250,
        description: "Increases the capacity of the banked inspiration pool by {{value}}."
    },
    instantpool: {
        name: "Instant Delivery",
        tier: "core",
        icon: "instant delivery",
        baseValue: 100,
        description: "Increases the capacity of the instant inspiration pool by {{value}}."
    },
    overtimepool: {
        name: "Over-time Delivery",
        tier: "core",
        icon: "over time delivery",
        baseValue: 500,
        description: "Increases the capacity of the over-time inspiration pool by {{value}}. The total value in the pool is distributed evenly across <i>3</i> days, every morning slot."
    },
    banked: {
        name: "Banked Inspiration",
        tier: "core",
        icon: "banked",
        baseValue: 100,
        description: "Adds {{value}} <i>general</i> inspiration to the banked pool."
    },
    instant: {
        name: "General Inspiration",
        tier: "core",
        icon: "instant",
        baseValue: 50,
        description: "Adds {{value}} <i>general</i> inspiration to the instant pool."
    },
    overtime: {
        name: "Overtime Inspiration",
        tier: "core",
        icon: "over time",
        baseValue: 200,
        description: "Adds {{value}} <i>general</i> inspiration to the over-time pool."
    },
    baking: {
        name: "Better Baked",
        tier: "supplementary",
        icon: "baking",
        baseValue: 100,
        description: "Adds {{value}} <i>general</i> inspiration to every pool if used in a baked dish."
    },
    frying: {
        name: "Better Fried",
        tier: "supplementary",
        icon: "frying",
        baseValue: 100,
        description: "Adds {{value}} <i>general</i> inspiration to every pool if used in a fried dish."
    },
    burger: {
        name: "Burger Staple",
        tier: "supplementary",
        icon: "burger",
        baseValue: 100,
        description: "Adds {{value}} <i>general</i> inspiration to every pool if used in a burger recipe."
    },
    salad: {
        name: "Salad Staple",
        tier: "supplementary",
        icon: "salad",
        baseValue: 100,
        description: "Adds {{value}} <i>general</i> inspiration to every pool if used in a salad recipe."
    },
    inedible: {
        name: "Inedible",
        tier: "specialization",
        icon: "inedible",
        description: "Most people will refuse to eat this."
    },
    Physical: {
        name: "Physical Conversion",
        tier: "core",
        icon: "physical conversion",
        baseValue: 100,
        description: "Converts {{value}} <i>general</i> inspiration (split evenly) into each physical inspiration type."
    },
    Mental: {
        name: "Mental Conversion",
        tier: "core",
        icon: "mental conversion",
        baseValue: 100,
        description: "Converts {{value}} <i>general</i> inspiration (split evenly) into each mental inspiration type."
    },
    Martial: {
        name: "Martial Conversion",
        tier: "core",
        icon: "martial conversion",
        baseValue: 100,
        description: "Converts {{value}} <i>general</i> inspiration into martial inspiration."
    },
    mushy: {
        name: "Mushy",
        tier: "specialization",
        icon: "mushy",
        description: "People may have a preference for or against this modifier."
    },
    savory: {
        name: "Savory",
        tier: "supplementary",
        icon: "savory",
        baseValue: 100,
        description: "Adds {{value}} <i>general</i> inspiration to the banked pool."
    },
    sweet: {
        name: "Sweet",
        tier: "supplementary",
        icon: "sweet",
        baseValue: 50,
        description: "Adds {{value}} <i>general</i> inspiration to the instant pool."
    },
    additive: {
        name: "Additive",
        tier: "supplementary",
        icon: "additive",
        description: "This ingredient fills the additive slot during cooking. This modifier doesn't carry over past the cooking process."
    },
    pretty: {
        name: "Pretty",
        tier: "specialization",
        icon: "pretty",
        description: "People may have a preference for or against this modifier."
    }
};

const showcaseLayout = {
    specialization: [

    ],
    supplementary: [
        { id: "baking", stacks: 1 },
        { id: "frying", stacks: 1 }
    ],
    core: [
        { id: "protein", stacks: 3 },
        { id: "instant", stacks: 1 },
        { id: "Physical", stacks: 1 }
    ]
};

const tierLabels = {
    specialization: "Specialization",
    supplementary: "Supplementary",
    core: "Core"
};

// DOM Elements
const modifierGroupSelect = document.getElementById('modifier-food-group');
const modifierSubgroupSelect = document.getElementById('modifier-subgroup');
const modifierTypeSelect = document.getElementById('modifier-type');
const modifierFormSelect = document.getElementById('modifier-form');
const modifierIngredientSprite = document.getElementById('modifier-ingredient-sprite');
const modifierIngredientName = document.getElementById('modifier-ingredient-name');
const modifierCardsContainer = document.getElementById('modifier-cards-container');

// Populate a select element with options
function populateModifierSelect(selectElement, options) {
    selectElement.innerHTML = '';
    for (const [key, value] of Object.entries(options)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = value.label || value;
        selectElement.appendChild(option);
    }
}

// Build a modifier card HTML
function buildModifierCard(modifierInstance) {
    const def = modifierDefs[modifierInstance.id];
    const stacks = modifierInstance.stacks || 1;

    let desc = def.description;

    // Calculate and replace dynamic values
    if (def.baseValue !== undefined) {
        const calculatedValue = (def.baseValue * stacks).toFixed(2).replace(/\.?0+$/, '');
        desc = desc.replace('{{value}}', `<span class="stack-value">${calculatedValue}</span>`);
    }

    // Handle any remaining static markers
    desc = desc.replace(/\{\{(.+?)\}\}/g, '<span class="stack-value">$1</span>');

    let stackHtml = '';
    if (stacks > 1) {
        stackHtml = `<div class="modifier-stack">${stacks}x</div>`;
    }

    return `
        <div class="modifier-card tier-${def.tier}">
            ${stackHtml}
            <div class="modifier-icon">
                <img src="images/modifiers/${def.icon}.png" alt="${def.name}">
            </div>
            <div class="modifier-content">
                <div class="modifier-name">${def.name}</div>
                <div class="modifier-description">${desc}</div>
            </div>
        </div>
    `;
}

// Build Showcase 
function buildShowcase() {
    const container = document.getElementById('modifier-showcase');
    let html = '';
    
    for (const [tier, modifiers] of Object.entries(showcaseLayout)) {
        const cards = modifiers.map(m => buildModifierCard(m)).join('');
        html += `
            <div class="modifier-tier-row ${tier}-row">
                <div class="modifier-tier-label">${tierLabels[tier]}</div>
                <div class="modifier-cards-row">${cards}</div>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// Build modifier cards per element
function buildElementGroup(label, modifiers) {
    if (!modifiers || modifiers.length === 0) return '';

    const cards = modifiers.map(m => buildModifierCard(m)).join('');

    return `
        <div class="modifier-element-group">
            <div class="modifier-element-label">${label}</div>
            <div class="modifier-cards-row">${cards}</div>
        </div>
    `;
}

// Update the display based on current selections
function updateModifierDisplay() {
    const group = modifierGroupSelect.value;
    const subgroup = modifierSubgroupSelect.value;
    const type = modifierTypeSelect.value;
    const form = modifierFormSelect.value;

    const groupData = modifierIngredientData[group];
    const subgroupData = groupData.subgroups[subgroup];
    const typeData = subgroupData.types[type];
    const formData = typeData.forms[form];

    // Update name
    if (group === 'protein' && subgroup === 'meat') {
        modifierIngredientName.textContent = `${typeData.label} ${formData.label}`;
    } else if (group === 'protein' && subgroup === 'egg') {
        modifierIngredientName.textContent = `${formData.label} ${typeData.label} Egg`;
    } else {
        modifierIngredientName.textContent = `${formData.label} ${typeData.label}`;
    }

    // Update sprite
    let extension = (type === 'glowshroom') ? 'gif' : 'png';
    modifierIngredientSprite.src = `images/ingredients/${subgroup}-${type}-${form}.${extension}`;

    // Build modifier cards
    let cardsHtml = '';
    cardsHtml += buildElementGroup('Group Modifiers', groupData.modifiers);
    cardsHtml += buildElementGroup('Subgroup Modifiers', subgroupData.modifiers);
    cardsHtml += buildElementGroup('Type Modifiers', typeData.modifiers);
    cardsHtml += buildElementGroup('Form Modifiers', formData.modifiers);

    modifierCardsContainer.innerHTML = cardsHtml || '<p>No modifiers for this ingredient.</p>';
}

// when group changes, update subgroups
function onModifierGroupChange() {
    const group = modifierGroupSelect.value;
    populateModifierSelect(modifierSubgroupSelect, modifierIngredientData[group].subgroups);
    onModifierSubgroupChange();
}

// when subgroup changes, update types
function onModifierSubgroupChange() {
    const group = modifierGroupSelect.value;
    const subgroup = modifierSubgroupSelect.value;
    populateModifierSelect(modifierTypeSelect, modifierIngredientData[group].subgroups[subgroup].types);
    onModifierTypeChange();
}

// when type changes, update forms
function onModifierTypeChange() {
    const group = modifierGroupSelect.value;
    const subgroup = modifierSubgroupSelect.value;
    const type = modifierTypeSelect.value;
    populateModifierSelect(modifierFormSelect, modifierIngredientData[group].subgroups[subgroup].types[type].forms);
    updateModifierDisplay();
}

// Event listeners
modifierGroupSelect.addEventListener('change', onModifierGroupChange);
modifierSubgroupSelect.addEventListener('change', onModifierSubgroupChange);
modifierTypeSelect.addEventListener('change', onModifierTypeChange);
modifierFormSelect.addEventListener('change', updateModifierDisplay);


// Initialize
onModifierGroupChange();
buildShowcase();

