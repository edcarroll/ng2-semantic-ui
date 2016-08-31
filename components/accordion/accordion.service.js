export var SuiAccordionService = (function () {
    function SuiAccordionService() {
        // State
        this.closeOthers = true;
        this.panels = [];
    }
    SuiAccordionService.prototype.addPanel = function (panel) {
        panel.service = this;
        this.panels.push(panel);
    };
    SuiAccordionService.prototype.closeOtherPanels = function (panel) {
        if (!this.closeOthers) {
            return;
        }
        this.panels.forEach(function (p) {
            if (p !== panel) {
                p.isOpen = false;
            }
        });
    };
    return SuiAccordionService;
}());
//# sourceMappingURL=C:/Users/Edward/dev/ng2-semantic-ui/components/accordion/accordion.service.js.map