const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify-es').default;

// Placeholders for dynamic imports
let rev;
let imagemin;
let del;

async function loadESModules() {
    if (!rev) {
        rev = (await import('gulp-rev')).default;
    }
    if (!imagemin) {
        imagemin = (await import('gulp-imagemin')).default;
    }
    if (!del) {
        del = (await import('del')).default;
    }
}

gulp.task('css', async function() {
    await loadESModules();
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

gulp.task('js', async function(done){
    await loadESModules();
    console.log('minifying js...');
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('images', async function(done){
    await loadESModules();
    console.log('compressing images....');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

// empty the previous assets directory
gulp.task('clean:assets', async function(done){
    await loadESModules();
    await del(['./public/assets']);
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images', function(done){
    console.log('Building assets');
    done();
}));

// Define the default task
gulp.task('default', gulp.series('build'));
