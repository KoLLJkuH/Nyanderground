// Сцена, камера и рендерер
const container = document.getElementById('container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Освещение
const light = new THREE.AmbientLight(0xffffff, 1); // Мягкий белый свет
scene.add(light);

// Загрузка 3D-модели
const loader = new THREE.GLTFLoader();
const textureLoader = new THREE.TextureLoader();

loader.load(
  'models/chukasa.glb', // Укажите путь к вашей модели
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    // Загрузка текстур (если они не встроены в модель)
    const texture = textureLoader.load('textures/your_texture.jpg'); // Укажите путь к текстуре

    // Применение текстуры ко всем материалам модели
    model.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture;
        child.material.needsUpdate = true;
      }
    });

    // Устанавливаем масштаб модели
    model.scale.set(55, 55, 55); // Увеличьте значения для нужного размера

    // Центрируем модель (при необходимости)
    model.position.set(0, 0, 0);

    // Для отладки можно вращать модель
    function animateModel() {
      model.rotation.y += 0.01; // Вращение вокруг оси Y
      requestAnimationFrame(animateModel);
    }
    animateModel();
  },
  (xhr) => {
    console.log(`Model loading: ${(xhr.loaded / xhr.total) * 100}% loaded`);
  },
  (error) => {
    console.error('An error occurred while loading the model:', error);
  }
);
Ы

// Позиция камеры
camera.position.z = 5;

// Обновление сцены
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Адаптация к изменению размера окна
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
