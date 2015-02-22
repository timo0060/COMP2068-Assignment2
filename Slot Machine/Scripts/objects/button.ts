module objects {
    export class Button {

        // PRIVATE INSTANCE VARIABLES +++++++++++++++++++++++++++++++++++++++++++++++++
        private _buttonImage: createjs.Bitmap;
        private _x: number;
        private _y: number;
        private _disabled: boolean;

        constructor(path: string, x: number, y: number, disabled: boolean) {
            this.setX(x);
            this.setY(y);
            this.setDisabled(disabled);

            this._buttonImage = new createjs.Bitmap(path);
            this._buttonImage.x = this.getX();
            this._buttonImage.y = this.getY();
            this._buttonImage.addEventListener("mouseover", this._buttonOver);
            this._buttonImage.addEventListener("mouseout", this._buttonOut);           
        }

        // PUBLIC PROPERTIES
        public getImage(): createjs.Bitmap {

            return this._buttonImage;
        }

        public getX(): number {
            return this._x;
        }

        public isDisabled(): boolean {
            return this._disabled;
        }

        public getY(): number {
            return this._y;
        }

        public setX(x: number) {
            this._x = x;
        }

        public setY(y: number) {
            this._y = y;
        }

        public setDisabled(disabled: boolean) {
            this._disabled = disabled;
        }

        // EVENT HANDLERS

        private _buttonOut(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = 1.0;
        }

        private _buttonOver(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = 0.5;
        }

    }

}