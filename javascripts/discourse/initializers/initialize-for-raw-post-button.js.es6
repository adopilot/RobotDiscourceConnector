import I18n from "I18n";
import { withPluginApi } from "discourse/lib/plugin-api";
import showModal from "discourse/lib/show-modal";

export default {
  name: "RobotDiscourceConnector",
  initialize() {
    withPluginApi("0.8.7", api => {
      const currentUser = api.getCurrentUser();
      if (!currentUser) return;

      if (
        currentUser.staff ||
        currentUser.trust_level >= settings.min_trust_level
      ) {
        api.attachWidgetAction("post-menu", "utroseniSati", function() {
          const model = this.attrs;
          const link = window.location.origin+'/'+model.shareUrl;
          const url = "http://erp.rgt.ba/ipPref/Task?url=" + encodeURIComponent(link) + "&title=Naplata";  
          window.open(url, '_blank');
        });
        
         api.attachWidgetAction("post-menu", "kasaProblem", function() {
           const model = this.attrs; 
           const link = window.location.origin+'/'+model.shareUrl;
           const url = "http://core.rgt.ba/ProblemiKasa/Create?url=" + encodeURIComponent(link);
           window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=800,height=600');
           
        });
        
          api.attachWidgetAction("post-menu", "kasaProblemGotovo", function() {
           const model = this.attrs; 
           const link = window.location.origin+'/'+model.shareUrl;
           const url = "http://core.rgt.ba/ProblemiKasa/Zatvori?url=" + encodeURIComponent(link);
           window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=800,height=600');
           
        });

        api.addPostMenuButton("utroseni-sati", (attrs) => {
          return {
            action: "utroseniSati",
            icon: "check",
            className: "raw-post",
            title: I18n.t('Naplatite utrošene sate'),
            position: 'first-last-hidden'
          };
        });
        
         api.addPostMenuButton("kasa-problem", (attrs) => {
          return {
            action: "kasaProblem",
            icon: "cart-plus",
            className: "raw-post",
            title: "Orvorite problem na kasi",
            position: 'second-last-hidden'
          };
        });
        
        
         api.addPostMenuButton("kasa-gotvo", (attrs) => {
          return {
            action: "kasaProblemGotovo",
            icon: "cart-arrow-down",
            className: "raw-post",
            title: "Orvorite problem na kasi",
            position: 'second-last-hidden'
          };
        });
        
        
      }
    });
  }
};
