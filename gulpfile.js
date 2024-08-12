import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import htmlmin from 'gulp-htmlmin';
import browser from 'browser-sync';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import gulpSquoosh from 'gulp-libsquoosh';
import gulpSvgo from 'gulp-svgo';
import svgSprite from 'gulp-svgstore';
import { deleteAsync } from 'del';
import terser from 'gulp-terser';

// Styles

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// Html

export const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'))
};

// Scripts

export const scripts = () => {
  return gulp.src('source/js/*.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'))
};

// Images

export const optimizeImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(gulpSquoosh())
  .pipe(gulp.dest('build/img'))
}

// WebP

export const createWebp = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(gulpSquoosh({
    webp: {}
  }))
  .pipe(gulp.dest('build/img'))
}

// SVG

export const optimizeSvg = () => {
  return gulp.src('source/img/*.svg', '!source/img/sprite/*.svg')
  .pipe(gulpSvgo())
  .pipe(gulp.dest('build/img'))

}

// Sprite

export const createSvgSprite = () => {
  return gulp.src('source/img/sprite/*.svg')
  .pipe(gulpSvgo())
  .pipe(svgSprite({
    inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img'))
}

// Copy

export const copy = (done) => {
  gulp.src([
    'source/fonts/**/*.{woff2,woff}',
    'source/*.ico',
    'source/*.webmanifest',
    'source/*.html'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'))
  done();
}

// Copy images

export const copyImages = (done) => {
  gulp.src([
    'source/img/**/*.{jpg,png,svg}',
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'))
  done();
}

// Clean

export const clean = () => {
  return deleteAsync('build');
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/js/*.js').on('change', browser.reload);
  gulp.watch('source/*.html').on('change', browser.reload);
}

// Build
export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    optimizeSvg,
    createSvgSprite,
    createWebp
  ),
);


export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    optimizeSvg,
    createSvgSprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);
