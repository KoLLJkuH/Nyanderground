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

// Подключаем GLTFLoader и проверяем наличие текстур в модели
const loader = new THREE.GLTFLoader();
loader.load(
  'models/chukasa.glb', // Укажите путь к вашей модели
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    // Проверка на наличие материалов и текстур в модели
    model.traverse((child) => {
      if (child.isMesh) {
        // Проверим, есть ли материал и текстура
        if (child.material.map) {
          console.log('Текстура загружена в модель');
        }
      }
    });

    // Устанавливаем масштаб модели
    model.scale.set(155, 155, 155); // Увеличьте значения для нужного размера

    // Центрируем модель (при необходимости)
    model.position.set(0, 0, 0);

    // Вращение модели для отладки
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
