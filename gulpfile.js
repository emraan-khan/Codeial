const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');

// Placeholder for rev to be imported dynamically
let rev;

async function loadRev() {
    if (!rev) {
        rev = (await import('gulp-rev')).default;
    }
}

gulp.task('css', async function() {
    await loadRev();
    console.log('minifying css...');
    return gulp.src('./assets/scss/**/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest('./assets/css'))
        .pipe(gulp.src('./assets/**/*.css'))
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest('./public/assets'));
});

// Define the default task
gulp.task('default', gulp.series('css'));


