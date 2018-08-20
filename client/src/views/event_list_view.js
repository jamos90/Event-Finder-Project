const PubSub = require('../helpers/pub_sub.js');
const EventItemView = require('./event_item_view.js');

const EventListView = function(container) {
  this.container = container;
};

EventListView.prototype.bindEvents = function() {
  PubSub.subscribe('Events:event-data-loaded', (evt) => {
    const items = evt.detail;
    this.renderList(items);
    console.log(items.length);
  });
};

EventListView.prototype.renderList = function(items) {
  this.emptyList();
  const eventsLength = items.length;
  const eventCounter = document.createElement("h1");
  const resultsTab = document.createElement("button");
  resultsTab.setAttribute("id", "defaultOpen");
  resultsTab.setAttribute("class", "tablinks")
  resultsTab.innerHTML = "Results";
  const savedTab = document.createElement("button");
  savedTab.setAttribute("id", 'favouritesButton');
  savedTab.setAttribute("class", "tablinks");
  resultsTab.addEventListener('click', () => {
    openTab(event, "search");
  })
  savedTab.addEventListener('click', () => {
    openTab(event, "favourites");
  })
  savedTab.innerHTML = "Saved";
  const listDiv = document.createElement("div");
  listDiv.setAttribute("class", "tabcontent");
  listDiv.setAttribute("id", "search");
  const favourites = document.createElement("div");
  favourites.setAttribute("class", "tabcontent");
  favourites.setAttribute("id", "favourites");
  eventCounter.textContent = `${eventsLength} events found`;
  this.container.appendChild(resultsTab);
  this.container.appendChild(savedTab);
  listDiv.appendChild(eventCounter);
  items.forEach((item) => {
    const eventSearchResult = this.renderItem(item);
    listDiv.appendChild(eventSearchResult);
  });
  this.container.appendChild(listDiv);
  this.container.appendChild(favourites)
  resultsTab.click();
};

EventListView.prototype.emptyList = function(items) {
  this.container.innerHTML = '';
};

EventListView.prototype.renderItem = function(item) {
  const eventItemView = new EventItemView();
  const eventItem = eventItemView.render(item);
  return eventItem;
};

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}



module.exports = EventListView;
