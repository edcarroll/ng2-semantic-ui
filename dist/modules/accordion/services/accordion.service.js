var SuiAccordionService = /** @class */ (function () {
    function SuiAccordionService() {
        this.closeOthers = true;
        this.transition = "fade";
        this.transitionDuration = 350;
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
export { SuiAccordionService };
//# sourceMappingURL=accordion.service.js.map