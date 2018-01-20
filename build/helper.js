const fs = require('fs');
const path = require('path');

module.exports = {
    clear(dir) {
        this.scan(dir, true);
    },
    getFiles(dir) {
        return this.scan(dir)
    },
    scan(dir, isDel, index) {
        if (!isDel) {
            isDel = false;
        }

        if (!index) {
            index = 0;
        }

        var files = [];

        if (fs.existsSync(dir)) {
            var dirList = fs.readdirSync(dir);
            dirList.forEach((file, index) => {
                var curDir = path.join(dir, file)
                if (fs.statSync(curDir).isDirectory()) {
                    var tempFiles = this.scan(curDir, isDel, index + 1);
                    if (tempFiles.length > 0) {
                        files = files.concat(tempFiles);
                    }
                } else {
                    if (isDel) {
                        fs.unlinkSync(curDir);
                        return;
                    }

                    files.push(curDir);
                }
            });

            if (isDel && index > 0) {
                fs.rmdirSync(dir);
            }
        };

        if (!isDel) {
            return files;
        }
    }
}