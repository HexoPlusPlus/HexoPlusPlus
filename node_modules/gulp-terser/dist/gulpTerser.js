"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const through2_1 = require("through2");
const terser_1 = require("terser");
const PluginError = require("plugin-error");
const applySourceMap = require("vinyl-sourcemaps-apply");
const PLUGIN_NAME = 'terser';
/**
 * @param { MinifyOptions } gulpTerserOptions: gulp-terser configuration
 * @param { typeof minify | undefined } cMinifyFunc：custom minify function
 */
function gulpTerser(gulpTerserOptions = {}, cMinifyFunc) {
    const minifyFunc = cMinifyFunc !== null && cMinifyFunc !== void 0 ? cMinifyFunc : terser_1.minify;
    return through2_1.obj(async function (chunk, enc, callback) {
        if (chunk.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return callback();
        }
        if (chunk.isBuffer()) {
            try {
                const terserOptions = { ...gulpTerserOptions };
                // SourceMap configuration
                if (chunk.sourceMap) {
                    if (!terserOptions.sourceMap || terserOptions.sourceMap === true) {
                        terserOptions.sourceMap = {};
                    }
                    terserOptions.sourceMap.filename = chunk.sourceMap.file;
                }
                const chunkString = chunk.contents.toString('utf8');
                let build = {};
                // gulp version compatibility
                if (('sourceMap' in chunk) && ('file' in chunk.sourceMap)) {
                    build[chunk.sourceMap.file] = chunkString;
                }
                else {
                    build = chunkString;
                }
                // Compressed code (terser5 is asynchronous, terser4 is synchronous)
                const minifyOutput = await minifyFunc(build, terserOptions);
                if ('error' in minifyOutput) {
                    throw new Error(minifyOutput['error']['message']);
                }
                // Buffer
                if (minifyOutput.code) {
                    chunk.contents = ('from' in Buffer) ? Buffer.from(minifyOutput.code) : new Buffer(minifyOutput.code);
                }
                // Output source-map
                if (chunk.sourceMap && minifyOutput.map) {
                    applySourceMap(chunk, minifyOutput.map);
                }
                this.push(chunk);
                return callback();
            }
            catch (err) {
                this.emit('error', new PluginError(PLUGIN_NAME, err));
                return callback();
            }
        }
    });
}
exports.default = gulpTerser;
